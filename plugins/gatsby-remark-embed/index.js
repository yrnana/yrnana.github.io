const axios = require('axios');
const visit = require('unist-util-visit');
const parse5 = require('parse5');
const fromParse5 = require('hast-util-from-parse5');

const htmlToHast = (string) =>
  fromParse5(parse5.parseFragment(string)).children[0];

const getTimeValueInSeconds = (t) => {
  if (Number(t).toString() === t) {
    return t;
  }
  const {
    2: hours = '0',
    4: minutes = '0',
    6: seconds = '0',
  } = t.match(/((\d*)h)?((\d*)m)?((\d*)s)?/);
  return String((Number(hours) * 60 + Number(minutes)) * 60 + Number(seconds));
};

/**
 * 1. Youtube
 * @example https://www.youtube.com/watch?v=aXVj8Is0XAw
 * @example https://youtu.be/aXVj8Is0XAw
 * ?t=97 -> ?start=130
 */
const youtube = {
  shouldTransform: (url) => {
    return /(youtu\.be\/|youtube\.com\/)/.test(url);
  },
  getHTML: async (url) => {
    const youtubeId = url.match(
      /(?:https:\/\/)(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([^?]+)(?:\?.*)?/,
    )?.[1];
    const src = new URL(`https://www.youtube.com/embed/${youtubeId}`);
    const t = new URL(url).searchParams.get('t');
    if (t) {
      src.searchParams.set('start', getTimeValueInSeconds(t));
    }
    return `<iframe 
      width="640" 
      height="360" 
      src="${src.toString()}"
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
    ></iframe>`.trim();
  },
};

/**
 * 2. Codesandbox
 * @example https://codesandbox.io/s/image-resize-compressor-77z3f
 */
const codesandbox = {
  shouldTransform: (url) => {
    return /codesandbox\.io\/s\//.test(url);
  },
  getHTML: async (url) => {
    const codesandboxId = url.match(/codesandbox\.io\/s\/(.*)/)?.[1];
    return `<iframe src="https://codesandbox.io/embed/${codesandboxId}?fontsize=14&hidenavigation=1&theme=dark"
      title="${codesandboxId}"
      style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>`.trim();
  },
};

/**
 * 3. Twitter
 * @example https://twitter.com/kentcdodds/status/1445103851783082002?s=20
 */
const twitter = {
  shouldTransform: (url) => {
    return /twitter\.com/.test(url);
  },
  getHTML: async (url) => {
    const { data } = await axios.get(`https://publish.twitter.com/oembed`, {
      params: {
        url,
        dnt: true,
        omit_script: true,
        hide_thread: true,
        link_color: '#8b5cf6',
      },
    });
    return data.html;
  },
};

const testingLibrary = {
  shouldTransform: (url) => {
    return /testing-playground\.com/.test(url);
  },
  getHTML: async (url) => {
    const { pathname } = new URL(url);
    const path =
      pathname === '/' ? '/embed' : pathname.replace('/gist/', '/embed/');
    return `<iframe 
      src="https://testing-playground.com${path}?panes=preview,result" 
      height="450" 
      width="100%" 
      scrolling="no" 
      frameBorder="0" 
      allowTransparency="true" 
      title="Testing Playground" 
      style="overflow: hidden; display: block; width: 100%"
    ></iframe>`.trim();
  },
};

const transformers = [youtube, codesandbox, twitter, testingLibrary];

module.exports = async ({ markdownAST, cache }) => {
  const asyncTransforms = [];
  visit(markdownAST, 'link', (node, _, parent) => {
    transformers.forEach(({ shouldTransform, getHTML }) => {
      const { url } = node;
      if (shouldTransform(url)) {
        asyncTransforms.push(async () => {
          let html = await cache.get(url);
          if (!html) {
            html = await getHTML(url);
            await cache.set(url, html);
          }
          const hast = htmlToHast(html);
          parent.data = {
            hName: hast.tagName,
            hProperties: hast.properties,
            hChildren: hast.children,
          };
        });
      }
    });
  });
  await Promise.all(asyncTransforms.map((t) => t()));
  return markdownAST;
};
