import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import Post from '~/components/post/Post';
import { getRawPosts, getPostDetail } from '~/helpers/api';

type PageProps = {
  postDetail: PostDetail;
};

const PostPage: NextPage<PageProps> = ({ postDetail }) => {
  return (
    <Layout>
      <Seo title={postDetail.title} />
      <Post {...postDetail} />
    </Layout>
  );
};

export default PostPage;

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const posts = getRawPosts();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = ({
  params,
}) => {
  const slug = params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const postDetail = getPostDetail(slug);
  return {
    props: {
      postDetail,
    },
  };
};
