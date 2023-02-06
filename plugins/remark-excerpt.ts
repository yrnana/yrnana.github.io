/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Root } from 'mdast';
import remarkStringify from 'remark-stringify';
import { type Transformer, unified } from 'unified';
import { visit } from 'unist-util-visit';

const parser = unified().use(remarkStringify);

export function remarkExcerpt(): Transformer<Root> {
  return function transformer(tree, { data }, done) {
    const texts: string[] = [];
    visit(tree, 'paragraph', (node, index, parent) => {
      const text = parser.stringify(node as unknown as Root);
      text && texts.push(text.replace(/\n/g, ''));
    });
    // @ts-ignore
    data.astro.frontmatter.excerpt = texts.join(' ');
    done();
  };
}
