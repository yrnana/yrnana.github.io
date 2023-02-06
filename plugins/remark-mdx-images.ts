import type { Root } from 'mdast';
import crypto from 'node:crypto';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { type Transformer, unified } from 'unified';
import type { Parent } from 'unist';
import { visit } from 'unist-util-visit';

const parser = unified().use(remarkParse).use(remarkMdx);

export function remarkMdxImages(): Transformer<Root> {
  return function transformer(tree, file, done) {
    visit(tree, 'image', (node, index, parent) => {
      if (isImageWithCaption(parent)) {
        return;
      }

      if (!/\.(png|jpg|jpeg|webp)$/.test(node.url) || /^http/.test(node.url)) {
        return;
      }

      const alt = node.alt || '';
      const uuid = crypto.randomBytes(4).toString('hex');
      const Picture = 'Picture' + uuid;

      const newTree = parser.parse(
        [
          `import { Picture as ${Picture} } from '@astrojs/image/components';\n\n`,
          `<figure>`,
          `<${Picture}`,
          ` src={import('${node.url}')}`,
          ` alt="${alt}"`,
          ` widths={[480, 790]}`,
          ` sizes="(max-width: 790px) 100vw, 790px"`,
          ` formats={['png', 'webp']}`,
          `/>`,
          `<figcaption>${alt}</figcaption>`,
          `</figure>`,
        ].join(''),
      );

      parent?.children.splice(index || 0, 1, ...newTree.children);
    });

    done();
  };
}

const isImageWithCaption = (parent: Parent | null) => {
  return parent?.type === 'picture';
};
