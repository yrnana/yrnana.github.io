import Link from 'next/link';
import { format } from 'date-fns';
import Tag from '~/components/tag/Tag';

const PostListItem: React.VFC<PostSummary> = ({
  date,
  slug,
  title,
  excerpt,
  tags,
}) => {
  return (
    <div>
      <Link href={`/post/${slug}`}>
        <a className="hover:text-purple-500">
          <h2 className="text-xl font-medium">{title}</h2>
        </a>
      </Link>
      <div className="text-gray-500 mt-2">{format(new Date(date), 'PP')}</div>
      {excerpt && <div className="mt-2">{excerpt}</div>}
      {tags && (
        <div className="flex flex-row flex-wrap space-x-3 mt-3">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} color="purple" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostListItem;
