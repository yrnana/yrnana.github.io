import dynamic from 'next/dynamic';
import Layout from '~/components/layout/Layout';
import Post from '~/components/post/Post';

const Comments = dynamic(() => import('~/components/post/Comments'), {
  ssr: false,
});

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
