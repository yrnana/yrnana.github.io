import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'post'>;

export type TagColor = 'yellow' | 'green' | 'violet' | 'sky' | 'rose';

export type Tag = {
  value: string;
  count: number;
  color?: TagColor;
};

export type ImportImage = {
  default: ImageMetadata;
};
