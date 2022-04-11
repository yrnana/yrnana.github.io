import { graphql, PageProps } from 'gatsby';
import { getSrc, ImageDataLike } from 'gatsby-plugin-image';
import { GoogleAdsense, Seo } from '~/components/common';
import { Layout } from '~/components/layout';
import { Comments, Post, PostNav, PostNavProps } from '~/components/post';

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
      <GoogleAdsense slot="4448901342" />
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
