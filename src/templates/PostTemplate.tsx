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
  const post = data.markdownRemark!;
  const { previous, next, id } = pageContext;
  const { title, excerpt, preview, tags } = post.frontmatter!;

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt || post.excerpt!}
        image={preview ? getSrc(preview as ImageDataLike) : undefined}
        keywords={tags?.join(',')}
        type="article"
        isBlogTitleDisabled
      />
      <Post {...post} />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4675264961434940"
        data-ad-slot="4448901342"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <PostNav previous={previous} next={next} />
      <Comments id={id} />
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query Post($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...PostItem
    }
  }
`;
