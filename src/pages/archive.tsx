import { graphql, PageProps } from 'gatsby';
import ArchiveList from '~/components/archive/ArchiveList';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';

const ArchivePage: React.FC<PageProps<ArchiveQuery>> = ({ data }) => {
  return (
    <Layout>
      <Seo title="archive" />
      <ArchiveList postGroups={data.allMarkdownRemark.group} />
    </Layout>
  );
};

export default ArchivePage;

export const query = graphql`
  query Archive {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/_contents/posts/**/*" } }
    ) {
      group(field: frontmatter___year) {
        ...ArchiveListItem
      }
    }
  }
`;
