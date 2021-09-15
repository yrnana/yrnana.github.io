import Link from 'next/link';

export interface PostListProps {
  posts: PostSummary[];
}

const PostList: React.VFC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/post/${post.slug}`}>
            <a>
              <h2>{post.title}</h2>
            </a>
          </Link>
          <div>
            <div>{post.date}</div>
            {post.excerpt && <div>{post.excerpt}</div>}
            {post.tags && <div>{post.tags}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
