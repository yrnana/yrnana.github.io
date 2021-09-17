import PostListItem from './PostListItem';

export interface PostListProps {
  posts: PostSummary[];
}

const PostList: React.VFC<PostListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col space-y-10">
      {posts.map((post) => (
        <PostListItem key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default PostList;
