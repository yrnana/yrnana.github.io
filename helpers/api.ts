import { getYear } from 'date-fns';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { omit } from 'lodash-es';
import { join } from 'path';
import { PAGE_SIZE } from '~/helpers/constants';
import { getTotalPages, markdownToHtml } from '~/helpers/utils';

const markdownDirectory = join(process.cwd(), '_md');
const postsDirectory = join(markdownDirectory, 'posts');

/**
 * 마크다운 파일 1개를 파일이름으로 읽는 함수
 * @param fileName _md 폴더의 마크다운 파일이름
 * @returns html string
 */
export async function getMarkdownContent(fileName: string): Promise<string> {
  const mdPath = join(markdownDirectory, `${fileName}.md`);
  const md = readFileSync(mdPath, 'utf8');
  const html = await markdownToHtml(md);
  return html;
}

/**
 * `_posts` 디렉토리에 존재하는 모든 글 목록 (slug)
 * @returns 글 목록
 */
export function getPostSlugs(): string[] {
  return readdirSync(postsDirectory);
}

/**
 * 가공되지 않은 글 1개를 slug로 조회하는 함수
 * @param slug
 * @returns raw 글
 */
export function getRawPostBySlug(slug: string): RawPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    ...(data as FrontMatter),
    content,
    slug: realSlug,
  };
}

/**
 * 가공되지 않은 글 목록을 가져오는 함수
 * @returns raw 글 목록
 */
export function getRawPosts(): RawPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .reduce<RawPost[]>((acc, slug) => {
      const post = getRawPostBySlug(slug);
      if (!post.published) return acc;
      return [...acc, post];
    }, [])
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

/**
 * 페이징 단위 글 목록을 반환하는 api
 * @param page
 * @param size
 * @returns 글 목록
 */
export function getPostList(page = 1, size = PAGE_SIZE): Pageable<PostSummary> {
  const rawPosts = getRawPosts();
  const totalElements = rawPosts.length;
  const totalPages = getTotalPages(totalElements, size);
  const offset = (page - 1) * size;
  const sliced = rawPosts.slice(offset, offset + size);
  return {
    data: sliced.map((post) => omit(post, ['content', 'published', 'preview'])),
    first: page === 1,
    last: page === totalPages,
    size,
    page,
    totalElements,
    totalPages,
  };
}

/**
 * 글 1개 정보를 반환하는 api
 * @param slug
 * @returns 글 정보
 */
export async function getPostDetail(slug: string): Promise<PostDetail> {
  const rawPosts = getRawPostBySlug(slug);
  const postDetail = omit(rawPosts, ['published']);
  const content = await markdownToHtml(postDetail.content);
  return {
    ...postDetail,
    content,
  };
}

/**
 * 태그에 해당하는 모든 글을 반환하는 api
 * - 페이징 기능 X
 * @param tag
 * @returns 글 목록
 */
export function getPostListByTag(tag: string): Pageable<PostSummary> {
  const rawPosts = getRawPosts();
  const filtered = rawPosts.filter((post) => !!post.tags?.includes(tag));
  const totalElements = filtered.length;
  return {
    data: filtered.map((post) => omit(post, ['content', 'published'])),
    first: true,
    last: true,
    size: totalElements,
    page: 1,
    totalElements,
    totalPages: 1,
  };
}

/**
 * 모든 태그목록을 반환하는 api
 * @returns 태그 목록
 */
export function getTags(): TagDetail[] {
  const rawPosts = getRawPosts();
  const tagObj = rawPosts.reduce<Record<string, number>>((prev, { tags }) => {
    if (!tags) return prev;
    tags.forEach((tag) => {
      if (prev[tag]) prev[tag] += 1;
      else prev[tag] = 1;
    });
    return prev;
  }, {});
  return Object.entries(tagObj).map(([name, count]) => ({ name, count }));
}

/**
 * 연단위 글목록을 반환하는 api
 * @returns 아카이브 글 목록
 */
export function getPostGroups(): PostGroup[] {
  const rawPosts = getRawPosts();
  const archiveObj = rawPosts.reduce<Record<number, PostGroup['posts']>>(
    (prev, { title, date, slug }) => {
      const year = getYear(new Date(date));
      const data = { title, date, slug };
      if (prev[year]) prev[year].push(data);
      else prev[year] = [data];
      return prev;
    },
    {},
  );
  return Object.entries(archiveObj)
    .map(([year, posts]) => ({
      year: Number(year),
      posts,
    }))
    .sort((a, b) => (a.year < b.year ? 1 : -1));
}
