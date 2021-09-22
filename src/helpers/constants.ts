const isDevelopment = process.env.NODE_ENV === 'development';

export const BLOG_URL = isDevelopment
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_BLOG_URL || '';
export const BLOG_TITLE = process.env.NEXT_PUBLIC_BLOG_TITLE || '';
export const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME || '';
export const COMMENT_ISSUE_REPO =
  process.env.NEXT_PUBLIC_COMMENT_ISSUE_REPO || '';
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
export const DEFAULT_IMAGE_URL = '/images/nana.log.png';

export const PAGE_SIZE = 10;
