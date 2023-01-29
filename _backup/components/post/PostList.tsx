import { NoData } from '~/components/common';
import { PostListItem } from './PostListItem';

export interface PostListProps {
  posts: PostListItemFragment[];
}

export const PostList: React.VFC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col space-y-12">
      {posts.map((post) => (
        <PostListItem key={post.slug} {...post} />
      ))}
    </div>
  );
};
