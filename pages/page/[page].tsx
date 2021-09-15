import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import Pagination from '~/components/post/Pagination';
import PostList from '~/components/post/PostList';
import { getPostList, getRawPosts } from '~/helpers/api';
import { getTotalPages } from '~/helpers/utils';

type PageProps = {
  postList: Pageable<PostSummary>;
};

const PostListWithPaginationPage: NextPage<PageProps> = ({ postList }) => {
  const { data, ...paginationProps } = postList;

  return (
    <Layout>
      {/* TODO: seo */}
      <Seo title="page 2" />
      <PostList posts={data} />
      <Pagination {...paginationProps} />
    </Layout>
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
