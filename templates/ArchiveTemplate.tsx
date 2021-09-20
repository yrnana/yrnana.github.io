import ArchiveList from '~/components/archive/ArchiveList';
import Layout from '~/components/layout/Layout';

export interface ArchiveTemplateProps {
  postGroups: PostGroup[];
}

const ArchiveTemplate: React.VFC<ArchiveTemplateProps> = ({ postGroups }) => {
  return (
    <Layout>
      <ArchiveList postGroups={postGroups} />
    </Layout>
  );
};

export default ArchiveTemplate;
