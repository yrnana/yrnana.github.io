import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';
import TagList from '~/components/tag/TagList';
import { getTags } from '~/helpers/api';

type PageProps = {
  tags: TagDetail[];
};

const TagsPage: NextPage<PageProps> = ({ tags }) => {
  return (
    <Layout>
      <Seo title="tags" />
      <TagList tags={tags} />
    </Layout>
  );
};

export default TagsPage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  const tags = getTags();
  return {
    props: {
      tags,
    },
  };
};
