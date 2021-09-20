import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getPostListByTag, getTags } from '~/helpers/api';
import PostListTemplate from '~/templates/PostListTemplate';

type PageProps = {
  tag: string;
  postList: Pageable<PostSummary>;
};

const PostListFilteredByTagPage: NextPage<PageProps> = ({ tag, postList }) => {
  return (
    <>
      <Seo title={tag} path={`/tag/${tag}`} />
      <PostListTemplate tag={tag} postList={postList} />
    </>
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
