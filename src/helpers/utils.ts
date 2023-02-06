import { getCollection } from 'astro:content';

import { format } from 'date-fns';

import type { ImportImage, Post, Tag } from '~/types';

export const formatDate = (date: Date, formatString = 'PP') =>
  format(date, formatString);

/**
 * 글을 date 역순으로 정렬
 */
export const orderByDateDesc = (a: Post, b: Post) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const getPosts = async () =>
  (
    await getCollection(
      'post',
      // @ts-ignore
      ({ data }) => {
        if (import.meta.env.DEV) return true;
        return data.draft !== true;
      },
    )
  ).sort(orderByDateDesc) as Post[];

/**
 * 글에서 모든 태그를 가져옴
 */
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

// workspace의 모든 이미지 목록
const images = import.meta.glob<boolean, string, ImportImage>([
  '~/assets/**.*',
  '!~/assets/**.{ts,svg}',
]);

/**
 * 이미지를 반환하는 함수
 * @param imagePath relative image path
 * @returns astro image component에 주입할 이미지 로더 함수
 */
export function getPostImage(imagePath: string) {
  const imageAbsolutePath = imagePath.replace(/^~/, '/src');
  const loader = Object.entries(images).find(
    ([filePath]) => filePath === imageAbsolutePath,
  )?.[1];
  if (!loader) {
    throw new Error('no image: ' + imagePath);
  }
  return loader();
}

type Sources = {
  type: string;
  srcset: string;
}[];

export const getImageSrc = (sources: Sources): string => {
  const image = sources.find(({ type }) => type === 'image/png')?.srcset ?? '';
  return image.replace(/ 480w$/, '');
};
