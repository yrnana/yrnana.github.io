import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getPostGroups } from '~/helpers/api';
import ArchiveTemplate from '~/templates/ArchiveTemplate';

type PageProps = {
  postGroups: PostGroup[];
};

const ArchivePage: NextPage<PageProps> = ({ postGroups }) => {
  return (
    <>
      <Seo title="archive" path="/archive" noindex />
      <ArchiveTemplate postGroups={postGroups} />
    </>
  );
};

export default ArchivePage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  const postGroups = getPostGroups();
  return {
    props: {
      postGroups,
    },
  };
};
