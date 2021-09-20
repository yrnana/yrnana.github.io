import Link from 'next/link';

export interface TagProps {
  name: string;
  color: TagColor;
  count?: number;
}

const Tag: React.VFC<TagProps> = ({ name, color, count }) => {
  return (
    <Link href={`/tag/${encodeURIComponent(name)}`}>
      <a
        className={`inline-flex items-center text-sm leading-4 rounded-full px-4 py-1.5 text-${color}-500 bg-${color}-100 hover:bg-${color}-200 hover:text-${color}-700`}
      >
        <span>{name}</span>
        {count && <span className="ml-1">({count})</span>}
      </a>
    </Link>
  );
};

export default Tag;
