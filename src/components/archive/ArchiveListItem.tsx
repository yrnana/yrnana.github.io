import { graphql, Link } from 'gatsby';
import { formatDate } from '~/helpers/utils';

export const ArchiveListItem: React.VFC<ArchiveListItemFragment> = ({
  year,
  posts,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-2">{year}</h3>
      <div>
        {posts.map((post) => (
          <div key={post.slug}>
            <Link
              className="inline-flex py-1 hover:text-violet-500"
              to={post.slug}
            >
              <span className="flex-shrink-0 w-16 text-violet-500">
                {formatDate(post.frontmatter?.date, 'MMM dd')}
              </span>
              <span className="break-all">{post.frontmatter?.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const archiveListItemFragment = graphql`
  fragment ArchiveListItem on MarkdownRemarkGroupConnection {
    year: fieldValue
    posts: nodes {
      slug
      frontmatter {
        title
        date
      }
    }
  }
`;
