import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import ArchiveTemplate from '~/templates/ArchiveTemplate';

type PageProps = {
  postGroups: PostGroup[];
};

const ArchivePage: NextPage<PageProps> = ({ postGroups }) => {
  return (
    <>
      <Seo title="Archive" />
      <ArchiveTemplate postGroups={postGroups} />
    </>
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
