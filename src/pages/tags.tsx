import { graphql, PageProps } from 'gatsby';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import TagList from '~/components/tag/TagList';

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
      filter: {
        fileAbsolutePath: { glob: "**/_contents/posts/*" }
        frontmatter: { published: { eq: true } }
      }
    ) {
      group(field: frontmatter___tags) {
        ...TagItem
      }
    }
  }
`;
