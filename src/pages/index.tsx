import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getPostList } from '~/helpers/api';
import PostListTemplate from '~/templates/PostListTemplate';

type PageProps = {
  postList: Pageable<PostSummary>;
};

const PostListPage: NextPage<PageProps> = ({ postList }) => {
  return (
    <>
      <Seo path="/" />
      <PostListTemplate postList={postList} hasPagination />
    </>
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
