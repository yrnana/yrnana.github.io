import Layout from '~/components/layout/Layout';
import Comments from '~/components/post/Comments';
import Post from '~/components/post/Post';

export interface PostTemplateProps {
  postDetail: PostDetail;
}

const PostTemplate: React.VFC<PostTemplateProps> = ({ postDetail }) => {
  return (
    <Layout>
      <Post {...postDetail} />
      <Comments />
    </Layout>
  );
};

export default PostTemplate;
