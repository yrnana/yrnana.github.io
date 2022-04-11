import { graphql, PageProps } from 'gatsby';
import { GoogleAdsense, Seo } from '~/components/common';
import { Layout } from '~/components/layout';
import { Pagination, PostList } from '~/components/post';

const PostListTemplate: React.VFC<PageProps<PostsQuery>> = ({ data }) => {
  const { nodes, pageInfo } = data.allMarkdownRemark;

  return (
    <Layout>
      <Seo />
      <GoogleAdsense slot="8006423859" className="mb-10" />
      <PostList posts={nodes} />
      <Pagination {...pageInfo} />
    </Layout>
  );
};

export default PostListTemplate;

export const query = graphql`
  query Posts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/_contents/posts/**/*" } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...PostListItem
      }
      pageInfo {
        ...Pagination
      }
    }
  }
`;
