import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import PostList from '~/components/post/PostList';
import { getPostListByTag, getTags } from '~/helpers/api';

type PageProps = {
  tag: string;
  postList: Pageable<PostSummary>;
};

const PostListFilteredByTagPage: NextPage<PageProps> = ({ tag, postList }) => {
  return (
    <Layout>
      {/* TODO: seo */}
      <Seo title="tag hello" />
      <h2 className="text-center mb-10">
        <div className="inline-block rounded-full px-6 py-2 text-indigo-500 bg-indigo-100 text-2xl font-semibold">
          {tag}
        </div>
      </h2>
      <PostList posts={postList.data} />
    </Layout>
  );
};

export default PostListFilteredByTagPage;

type Params = {
  tag: string;
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const tags = getTags();
  return {
    paths: tags.map((tag) => ({
      params: {
        tag: tag.name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = ({
  params,
}) => {
  const tag = params?.tag;
  if (!tag) {
    return {
      notFound: true,
    };
  }
  const postList = getPostListByTag(tag);
  return {
    props: {
      tag,
      postList,
    },
  };
};
