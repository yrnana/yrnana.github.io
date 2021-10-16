import { graphql, PageProps } from 'gatsby';
import { getSrc, ImageDataLike } from 'gatsby-plugin-image';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import Comments from '~/components/post/Comments';
import Post from '~/components/post/Post';

const PostTemplate: React.VFC<PageProps<PostQuery>> = ({ data }) => {
  const post = data.mdx!;

  return (
    <Layout>
      <Seo
        title={post.frontmatter?.title}
        description={post.frontmatter?.excerpt || post.excerpt}
        image={getSrc(post.frontmatter?.preview as ImageDataLike)}
        keywords={post.frontmatter?.tags?.join(',')}
        type="article"
        isBlogTitleDisabled
      />
      <Post {...post} />
      <Comments />
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query Post($id: String!) {
    mdx(id: { eq: $id }) {
      ...PostItem
    }
  }
`;
