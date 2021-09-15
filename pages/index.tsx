import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import Pagination from '~/components/post/Pagination';
import PostList from '~/components/post/PostList';
import { getPostList } from '~/helpers/api';

type PageProps = {
  postList: Pageable<PostSummary>;
};

const PostListPage: NextPage<PageProps> = ({ postList }) => {
  const { data, ...paginationProps } = postList;

  return (
    <Layout>
      {/* TODO: seo */}
      <Seo />
      <PostList posts={data} />
      <Pagination {...paginationProps} />
    </Layout>
  );
};

export default PostListPage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  const postList = getPostList();
  return {
    props: {
      postList,
    },
  };
};
