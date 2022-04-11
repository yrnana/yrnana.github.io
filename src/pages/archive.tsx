import { graphql, PageProps } from 'gatsby';
import { ArchiveList } from '~/components/archive';
import { Seo } from '~/components/common';
import { Layout } from '~/components/layout';

export const ArchivePage: React.FC<PageProps<ArchiveQuery>> = ({ data }) => {
  return (
    <Layout>
      <Seo title="archive" />
      <ArchiveList postGroups={data.allMarkdownRemark.group} />
    </Layout>
  );
};

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
