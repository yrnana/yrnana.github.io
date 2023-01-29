import { graphql, PageProps } from 'gatsby';
import { Seo } from '~/components/common';
import { Layout } from '~/components/layout';
import { TagList } from '~/components/tag';

const TagsPage: React.FC<PageProps<TagsQuery>> = ({ data }) => {
  return (
    <Layout>
      <Seo title="tags" />
      <TagList tags={data.allMarkdownRemark.group} />
    </Layout>
  );
};

export default TagsPage;

export const query = graphql`
  query Tags {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/_contents/posts/**/*" } }
    ) {
      group(field: frontmatter___tags) {
        ...TagItem
      }
    }
  }
`;
