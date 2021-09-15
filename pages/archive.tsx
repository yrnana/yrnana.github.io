import type { GetStaticProps, NextPage } from 'next';
import ArchiveList from '~/components/archive/ArchiveList';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';

type PageProps = {
  postGroups: PostGroup[];
};

const ArchivePage: NextPage<PageProps> = ({ postGroups }) => {
  return (
    <Layout>
      <Seo title="Archive" />
      <ArchiveList postGroups={postGroups} />
    </Layout>
  );
};

export default ArchivePage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  return {
    props: {
      postGroups: [],
    },
  };
};
