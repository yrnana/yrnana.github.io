import { Link } from 'gatsby';

type PostEdgeFragment = {
  slug: string;
  frontmatter: {
    title: string;
  };
} | null;

export interface PostNavProps {
  previous: PostEdgeFragment; // 이전글
  next: PostEdgeFragment; // 다음글
}

export const PostNav: React.VFC<PostNavProps> = ({ previous, next }) => {
  if (!previous && !next) return null;

  return (
    <div className="flex mt-10 -mb-10">
      <div className="max-w-2/5">
        {previous && (
          <Link
            to={previous.slug}
            className="hover:text-violet-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-400 mr-1 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div>
              <div className="text-xs text-slate-500">Previous</div>
              <div>{previous.frontmatter.title}</div>
            </div>
          </Link>
        )}
      </div>
      <div className="max-w-2/5 text-right ml-auto">
        {next && (
          <Link
            to={next.slug}
            className="hover:text-violet-700 flex items-center"
          >
            <div>
              <div className="text-xs text-slate-500">Next</div>
              <div>{next.frontmatter.title}</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-400 ml-1 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};
