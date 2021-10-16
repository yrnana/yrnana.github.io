import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';

const ArchiveListItem: React.VFC<ArchiveListItemFragment> = ({
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
              className="inline-flex py-1 hover:text-purple-500"
              to={`/post/${post.slug}`}
            >
              <span className="flex-shrink-0 w-16 text-purple-500">
                {format(new Date(post.frontmatter?.date), 'MMM dd')}
              </span>
              <span className="break-all">{post.frontmatter?.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveListItem;

export const archiveListItemFragment = graphql`
  fragment ArchiveListItem on MdxGroupConnection {
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
