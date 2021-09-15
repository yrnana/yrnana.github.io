import remark from 'remark';
import html from 'remark-html';
import { PAGE_SIZE } from '~/helpers/constants';

export function getTotalPages(totalElements: number, size = PAGE_SIZE): number {
  return Math.ceil(totalElements / size);
}

export function getPathFromUrl(url?: string): string | undefined {
  return url?.split(/[?#]/)[0];
}

// export async function markdownToHtml(markdown: string) {
//   const result = await remark().use(html).process(markdown);
//   return result.toString();
// }
