import * as React from 'react';
import type { GatsbySSR } from 'gatsby';

const HeadComponents = [
  <link
    key="preconnect_1"
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />,
  <link
    key="preconnect_2"
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin=""
  />,
  <link
    key="jetbrains_mono"
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
    rel="stylesheet"
  />,
  <link
    key="katex"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
    rel="stylesheet"
  />,
  <script
    key="google_ads"
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4675264961434940"
    crossOrigin="anonymous"
  />,
];

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents(HeadComponents);
};
