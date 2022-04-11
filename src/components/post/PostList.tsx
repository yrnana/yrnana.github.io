import NoData from '~/components/common/NoData';
import PostListItem from './PostListItem';

export interface PostListProps {
  posts: PostListItemFragment[];
}

const PostList: React.VFC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col space-y-12 mb-8">
      {posts.map((post) => (
        <PostListItem key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default PostList;
