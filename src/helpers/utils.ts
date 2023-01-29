import { getCollection } from 'astro:content';

import path from 'node:path';

import type { ImportImage, PaginationItem, Post, Tag } from '~/types';

type Sources = {
  type: string;
  srcset: string;
}[];

export const getThumbnailSrc = (sources: Sources): string => {
  return (
    sources
      .find(({ type }) => type === 'image/png')
      ?.srcset.match(/(^\/.*png) 480w/)?.[1] ?? ''
  );
};

export const orderByDateDesc = (a: Post, b: Post) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const getPosts = async () =>
  (await getCollection('post')).sort(orderByDateDesc) as Post[];

export const getTags: (posts?: Post[]) => Promise<Tag[]> = async (posts) => {
  const tags = (posts || (await getPosts())).reduce<string[]>((prev, curr) => {
    prev.push(...curr.data.tags);
    return prev;
  }, []);

  const tagCounts = tags.reduce<Record<string, number>>((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});

  return Object.keys(tagCounts)
    .map((k) => ({
      value: k,
      count: tagCounts[k],
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * 페이징 목록을 반환하는 함수
 *
 * @param currentPage 현재 페이지
 * @param pageCount 총 페이지
 * @returns
 */
export function getPagination(
  currentPage: number,
  pageCount: number,
): PaginationItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, n) => ({
      isPage: true,
      isCurrentPage: n + 1 === currentPage,
      page: n + 1,
    }));
  }

  let pages: (number | string)[];
  if (currentPage <= 4) {
    pages = [1, 2, 3, 4, 5, '…', pageCount];
  } else if (currentPage >= pageCount - 3) {
    pages = [
      1,
      '…',
      pageCount - 4,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  } else {
    pages = [
      1,
      '…',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '…',
      pageCount,
    ];
  }
  return pages.map((p) => ({
    isPage: typeof p === 'number',
    isCurrentPage: p === currentPage,
    page: p,
  }));
}

export function getPostImage(
  post: Post,
  images: Record<string, () => Promise<ImportImage>>,
) {
  const imagePath = path.join(path.dirname(post.id), post.data.preview);
  const loader = Object.entries(images).find(([filePath]) =>
    filePath.endsWith(imagePath),
  )?.[1];
  if (!loader) {
    throw new Error('no image: ' + imagePath);
  }
  return loader();
}
