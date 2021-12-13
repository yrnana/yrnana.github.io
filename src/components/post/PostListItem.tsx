import { graphql, Link } from 'gatsby';
import Tag from '~/components/tag/Tag';
import { formatDate, renderAst } from '~/helpers/utils';

const PostListItem: React.VFC<PostListItemFragment> = ({
  slug,
  excerptAst,
  frontmatter,
}) => {
  const { date, title, tags, excerptAst: frontmatterExcerptAst } = frontmatter!;

  return (
    <div>
      <Link to={slug} className="hover:text-violet-500">
        <h2 className="text-xl font-medium">{title}</h2>
      </Link>
      <div className="text-slate-500 mt-2">{formatDate(date)}</div>
      <div className="mt-2 excerpt-markdown">
        {renderAst(frontmatterExcerptAst || excerptAst, true)}
      </div>
      {tags && (
        <div className="flex flex-row flex-wrap space-x-3 mt-3">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} color="violet" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostListItem;

export const postListItemFragment = graphql`
  fragment PostListItem on MarkdownRemark {
    slug
    excerptAst(pruneLength: 150, truncate: true)
    frontmatter {
      title
      date
      tags
      excerptAst
    }
  }
`;
