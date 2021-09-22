import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Script from 'next/script';
import Seo from '~/components/common/Seo';
import { getRawPosts, getPostDetail } from '~/helpers/api';
import PostTemplate from '~/templates/PostTemplate';

type PageProps = {
  postDetail: PostDetail;
};

const PostPage: NextPage<PageProps> = ({ postDetail }) => {
  return (
    <>
      <Seo
        title={postDetail.title}
        description={postDetail.excerpt}
        path={`/post/${postDetail.slug}`}
        image={postDetail.preview}
        isBlogTitleDisabled
      />
      <PostTemplate postDetail={postDetail} />
      <Script
        src="https://platform.twitter.com/widgets.js"
        async
        charSet="utf-8"
        strategy="lazyOnload"
      />
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
  const postDetail = await getPostDetail(slug);
  return {
    props: {
      postDetail,
    },
  };
};
