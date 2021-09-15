interface FrontMatter {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  preview?: string;
  published: boolean;
}

interface RawPost extends FrontMatter {
  content: string;
  /** @description md 파일명 */
  slug: string;
}

interface Pageable<T> {
  data: T[];
  first: boolean;
  last: boolean;
  /** @description 페이지 당 요소 갯수 */
  size: number;
  /** @description 현재 페이지 번호 */
  page: number;
  /** @description 총 요소 수 */
  totalElements: number;
  /** @description 총 페이지 수 */
  totalPages: number;
}

type PostSummary = Omit<RawPost, 'content' | 'published' | 'preview'>;

type PostDetail = Omit<RawPost, 'excerpt' | 'published'>;

interface PostGroup {
  year: number;
  posts: Pick<RawPost, 'title' | 'date' | 'slug'>[];
}

interface TagDetail {
  name: string;
  count: number;
}
