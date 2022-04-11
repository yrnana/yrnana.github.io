import { graphql, PageProps } from 'gatsby';
import GoogleAdsense from '~/components/common/GoogleAdsense';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import Pagination from '~/components/post/Pagination';
import PostList from '~/components/post/PostList';

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
