import { format } from 'date-fns';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Tag from '~/components/tag/Tag';

const Post: React.VFC<PostItemFragment> = ({ frontmatter, body }) => {
  const { title, date, preview, tags } = frontmatter!;

  return (
    <article>
      <header className="text-center mt-10 mb-20">
        {preview && (
          <GatsbyImage
            image={getImage(preview?.childImageSharp?.gatsbyImageData)!}
            alt={title!}
            className="mb-10"
          />
        )}
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="text-gray-500 mt-4">{format(new Date(date), 'PP')}</div>
        {tags && (
          <div className="flex flex-row flex-wrap justify-center space-x-3 mt-4">
            {tags.map((tag) => (
              <Tag key={tag} name={tag!} color="purple" />
            ))}
          </div>
        )}
      </header>
      <div className="markdown">
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </article>
  );
};

export default Post;

export const postItemFragment = graphql`
  fragment PostItem on Mdx {
    excerpt(pruneLength: 150, truncate: true)
    frontmatter {
      title
      date
      excerpt
      tags
      preview {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
    body
  }
`;
