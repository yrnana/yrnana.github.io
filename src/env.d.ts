/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly GA_ID: string;
  readonly PUBLIC_KAKAO_APP_KEY: string;
  readonly PUBLIC_FACEBOOK_APP_ID: string;
  readonly PUBLIC_PHASE: 'local' | 'internal' | 'external';
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
