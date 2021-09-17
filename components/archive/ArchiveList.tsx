import NoData from '~/components/common/NoData';
import ArchiveListItem from './ArchiveListItem';

export interface ArchiveListProps {
  postGroups: PostGroup[];
}

const ArchiveList: React.VFC<ArchiveListProps> = ({ postGroups }) => {
  if (postGroups.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col space-y-10">
      {postGroups.map((group) => (
        <ArchiveListItem key={group.year} {...group} />
      ))}
    </div>
  );
};

export default ArchiveList;
