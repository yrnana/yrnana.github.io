import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getPostList, getRawPosts } from '~/helpers/api';
import { getTotalPages } from '~/helpers/utils';
import PostListTemplate from '~/templates/PostListTemplate';

type PageProps = {
  postList: Pageable<PostSummary>;
};

const PostListWithPaginationPage: NextPage<PageProps> = ({ postList }) => {
  return (
    <>
      <Seo
        title={`page ${postList.page}`}
        path={`/page/${postList.page}`}
        noindex
      />
      <PostListTemplate postList={postList} hasPagination />
    </>
  );
};

export default PostListWithPaginationPage;

type Params = {
  page: string;
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const posts = getRawPosts();
  const totalPages = getTotalPages(posts.length);
  return {
    paths: Array.from({ length: totalPages }).map((_, i) => ({
      params: {
        page: String(i + 1),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = ({
  params,
}) => {
  const page = params?.page;
  if (!page || !/^\d+$/.test(page)) {
    return {
      notFound: true,
    };
  }
  const postList = getPostList(Number(page));
  return {
    props: {
      postList,
    },
  };
};
