import image from '@astrojs/image';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkBreaks from 'remark-breaks';
import remarkUnwrapImages from 'remark-unwrap-images';

import { remarkMdxImages } from './plugins/remark-mdx-images';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.DEV ? 'http://localhost:8000' : 'https://yrnana.dev',
  trailingSlash: 'never',
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '~/': `${process.cwd()}/src/`,
      },
    },
    server: {
      open: true,
    },
  },
  server: {
    port: 8000,
    host: true,
  },
  markdown: {
    gfm: true,
    remarkPlugins: [
      remarkBreaks,
      remarkUnwrapImages, // paragraph unwrap
      remarkMdxImages, // figure + caption, @astrojs/image 대응
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: false,
    },
  },
  integrations: [
    mdx(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    prefetch(),
    sitemap(),
    tailwind(),
  ],
});
