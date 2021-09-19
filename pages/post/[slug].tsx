import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getRawPosts, getPostDetail } from '~/helpers/api';
import { markdownToHtml } from '~/helpers/utils';
import PostTemplate from '~/templates/PostTemplate';

type PageProps = {
  postDetail: PostDetail;
};

const PostPage: NextPage<PageProps> = ({ postDetail }) => {
  return (
    <>
      <Seo title={postDetail.title} />
      <PostTemplate postDetail={postDetail} />
    </>
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

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const postDetail = getPostDetail(slug);
  const content = await markdownToHtml(postDetail.content);
  return {
    props: {
      postDetail: {
        ...postDetail,
        content,
      },
    },
  };
};
