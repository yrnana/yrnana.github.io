import { graphql, PageProps } from 'gatsby';
import ArchiveList from '~/components/archive/ArchiveList';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';

const ArchivePage: React.FC<PageProps<ArchiveQuery>> = ({ data }) => {
  return (
    <Layout>
      <Seo title="archive" noindex />
      <ArchiveList postGroups={data.allMdx.group} />
    </Layout>
  );
};

export default ArchivePage;

export const query = graphql`
  query Archive {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { glob: "**/_contents/posts/*" }
        frontmatter: { published: { eq: true } }
      }
    ) {
      group(field: frontmatter___year) {
        ...ArchiveListItem
      }
    }
  }
`;
