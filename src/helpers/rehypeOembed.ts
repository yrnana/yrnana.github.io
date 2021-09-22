import type { Element } from 'hast';
import rehypeParse from 'rehype-parse';
import { unified, Processor, Transformer } from 'unified';
import is from 'unist-util-is';
import visit from 'unist-util-visit';

const parseHtml = unified().use(rehypeParse, { fragment: true });

const visitor: visit.Visitor<Element> = (node, index: number, parent) => {
  const href = node.properties?.href;
  if (typeof href === 'string' && is(parent, 'element')) {
    if (/(youtu\.be\/|youtube\.com\/)/.test(href)) {
      const youtubeId = href.match(
        /(?:https:\/\/)(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)(.*)/,
      )?.[1];
      const parsed = parseHtml.parse(`
      <div class="responsive-container iframe-youtube">
        <iframe 
          src="https://www.youtube.com/embed/${youtubeId}"
          width="560"
          height="315"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>`);
      parent.children = parsed.children;
    } else if (/twitter/.test(href)) {
      const parsed = parseHtml.parse(`
      <blockquote class="twitter-tweet">
        <a href="${href.replace(/\?s=\d+/, '')}?ref_src=twsrc%5Etfw"></a>
      </blockquote>`);
      parent.children = parsed.children;
    } else if (/codesandbox/.test(href)) {
      const codesandboxId = href.match(
        /https:\/\/codesandbox\.io\/embed\/(.*)\?/,
      )?.[1];
      const parsed = parseHtml.parse(`
      <iframe
        src="${href}"
        style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
        title="${codesandboxId}"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>`);
      parent.children = parsed.children;
    }
  }
};

function attacher(this: Processor): Transformer {
  return function transformer(tree) {
    visit(tree, { tagName: 'a' }, visitor);
  };
}

export default attacher;
