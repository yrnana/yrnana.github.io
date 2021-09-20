import Layout from '~/components/layout/Layout';
import Post from '~/components/post/Post';

export interface PostTemplateProps {
  postDetail: PostDetail;
}

const PostTemplate: React.VFC<PostTemplateProps> = ({ postDetail }) => {
  return (
    <Layout>
      <Post {...postDetail} />
    </Layout>
  );
};

export default PostTemplate;
