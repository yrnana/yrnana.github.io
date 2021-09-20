import Link from 'next/link';
import { format } from 'date-fns';

const ArchiveListItem: React.VFC<PostGroup> = ({ year, posts }) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-2">{year}</h3>
      <div>
        {posts.map((post) => (
          <div key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              <a className="inline-flex py-1 hover:text-purple-500">
                <span className="flex-shrink-0 w-16 text-purple-500">
                  {format(new Date(post.date), 'MMM dd')}
                </span>
                <span className="break-all">{post.title}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveListItem;
