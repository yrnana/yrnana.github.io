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
  const { previous, next } = pageContext;
  const { title, excerpt, preview, tags } = post.frontmatter!;
  const commentIssueRepo = data?.site?.siteMetadata?.commentIssueRepo;

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
      <PostNav previous={previous} next={next} />
      {commentIssueRepo && <Comments commentIssueRepo={commentIssueRepo} />}
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query Post($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...PostItem
    }
    site {
      siteMetadata {
        commentIssueRepo
      }
    }
  }
`;
