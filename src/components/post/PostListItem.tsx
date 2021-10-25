import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Tag from '~/components/tag/Tag';

const PostListItem: React.VFC<PostListItemFragment> = ({
  slug,
  excerpt,
  frontmatter,
}) => {
  return (
    <div>
      <Link to={`/post/${slug!}`} className="hover:text-purple-500">
        <h2 className="text-xl font-medium">{frontmatter?.title}</h2>
      </Link>
      <div className="text-gray-500 mt-2">
        {format(new Date(frontmatter?.date), 'PP')}
      </div>
      <div className="mt-2 excerpt-markdown">
        {frontmatter?.excerpt?.body ? (
          <MDXRenderer>{frontmatter.excerpt.body}</MDXRenderer>
        ) : (
          excerpt
        )}
      </div>
      {frontmatter?.tags && (
        <div className="flex flex-row flex-wrap space-x-3 mt-3">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} name={tag!} color="purple" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostListItem;

export const postListItemFragment = graphql`
  fragment PostListItem on Mdx {
    slug
    excerpt(pruneLength: 150, truncate: true)
    frontmatter {
      title
      date
      tags
      excerpt {
        body
        rawBody
      }
    }
  }
`;
