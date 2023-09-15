/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly GA_ID: string;
  readonly SITE: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  let adsbygoogle: Record<string, unknown>[] | undefined;
}

export {};
