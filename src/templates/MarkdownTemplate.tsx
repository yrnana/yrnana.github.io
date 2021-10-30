import { graphql, PageProps } from 'gatsby';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import { renderAst } from '~/helpers/utils';

const MarkdownTemplate: React.FC<PageProps<MarkdownQuery>> = ({ data }) => {
  const markdown = data.markdownRemark!;
  const { title, excerpt } = markdown.frontmatter!;

  return (
    <Layout>
      <Seo title={title} description={excerpt || ''} />
      <div className="markdown">{renderAst(markdown.htmlAst)}</div>
    </Layout>
  );
};

export default MarkdownTemplate;

export const query = graphql`
  query Markdown($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
        excerpt
      }
    }
  }
`;
