import type { getPicture } from '@astrojs/image';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'post'>;

export type PostWithText = Post & {
  plainText: string;
};

export type GetPictureResult = Awaited<
  Promise<PromiseLike<ReturnType<typeof getPicture>>>
>;

export type PaginationItem = {
  page: string | number;
  isPage: boolean;
  isCurrentPage: boolean;
};

export type Tag = {
  value: string;
  count: number;
};

export type ImportImage = {
  default: ImageMetadata;
};
