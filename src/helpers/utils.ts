import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { PAGE_SIZE } from '~/helpers/constants';
import rehypeOembed from './rehypeOembed';

export function getTotalPages(totalElements: number, size = PAGE_SIZE): number {
  return Math.ceil(totalElements / size);
}

export function getPathFromUrl(url?: string): string | undefined {
  return url?.split(/[?#]/)[0];
}

/**
 * 마크다운을 html으로 변환
 * @param markdown 마크다운 문자열
 * @returns html 문자열
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // parse markdown content to a syntax tree
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype) // markdown syntax tree -> html syntax tree
    .use(rehypeOembed)
    .use(rehypeKatex)
    .use(rehypeHighlight) // highlight syntax tree
    .use(rehypeStringify) // serialize HTML syntax tree
    .process(markdown);
  return result.toString();
}
