import { graphql, PageProps } from 'gatsby';
import { GoogleAdsense, Seo } from '~/components/common';
import { Layout } from '~/components/layout';
import { PostList } from '~/components/post';

const PostListByTagTemplate: React.VFC<
  PageProps<PostsByTagQuery, PostsByTagQueryVariables>
> = ({ data, pageContext }) => {
  return (
    <Layout>
      <Seo title={pageContext.tag} />
      <h2 className="text-center mb-10">
        <div className="select-none inline-block rounded-full px-6 py-4 text-2xl leading-4 font-semibold text-indigo-500 bg-indigo-100">
          {pageContext.tag}
        </div>
      </h2>
      <GoogleAdsense slot="8006423859" className="mb-10" />
      <PostList posts={data.allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default PostListByTagTemplate;

export const query = graphql`
  query PostsByTag($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { glob: "**/_contents/posts/**/*" }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      nodes {
        ...PostListItem
      }
    }
  }
`;
