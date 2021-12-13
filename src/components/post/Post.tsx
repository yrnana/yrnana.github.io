import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Tag from '~/components/tag/Tag';
import { formatDate, renderAst } from '~/helpers/utils';

const Post: React.VFC<PostItemFragment> = ({ frontmatter, htmlAst }) => {
  const { title, date, preview, tags } = frontmatter!;

  return (
    <article>
      <header className="text-center mt-10 mb-20">
        {preview && (
          <GatsbyImage
            image={getImage(preview?.childImageSharp?.gatsbyImageData)!}
            alt={title}
            className="mb-10"
          />
        )}
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="text-slate-500 mt-4">{formatDate(date)}</div>
        {tags && (
          <div className="flex flex-row flex-wrap justify-center space-x-3 mt-4">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} color="violet" />
            ))}
          </div>
        )}
      </header>
      <div className="markdown">{renderAst(htmlAst)}</div>
    </article>
  );
};

export default Post;

export const postItemFragment = graphql`
  fragment PostItem on MarkdownRemark {
    htmlAst
    excerpt(pruneLength: 150, truncate: true)
    frontmatter {
      title
      date
      tags
      excerpt
      preview {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  }
`;
