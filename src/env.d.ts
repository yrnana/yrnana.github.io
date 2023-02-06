/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly GA_ID: string;
  readonly SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}
