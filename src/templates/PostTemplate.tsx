import { graphql, PageProps } from 'gatsby';
import { getSrc, ImageDataLike } from 'gatsby-plugin-image';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import Comments from '~/components/post/Comments';
import Post from '~/components/post/Post';
import PostNav, { PostNavProps } from '~/components/post/PostNav';

interface PostPageContext extends PostNavProps {
  id: string;
}

const PostTemplate: React.VFC<PageProps<PostQuery, PostPageContext>> = ({
  data,
  pageContext,
}) => {
  const post = data.mdx!;
  const { previous, next } = pageContext;
  const { title, excerpt, preview, tags } = post.frontmatter!;

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt?.rawBody || post.excerpt}
        image={preview ? getSrc(preview as ImageDataLike) : undefined}
        keywords={tags?.join(',')}
        type="article"
        isBlogTitleDisabled
      />
      <Post {...post} />
      <PostNav previous={previous} next={next} />
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
