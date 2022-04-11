import { useMemo } from 'react';
import { orderBy } from 'lodash-es';
import { NoData } from '~/components/common';
import { ArchiveListItem } from './ArchiveListItem';

export interface ArchiveListProps {
  postGroups: ArchiveListItemFragment[];
}

export const ArchiveList: React.VFC<ArchiveListProps> = ({ postGroups }) => {
  const groups = useMemo(() => {
    return orderBy(postGroups, ['year'], ['desc']);
  }, [postGroups]);

  if (postGroups.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col space-y-10">
      {groups.map((group) => (
        <ArchiveListItem key={group.year} {...group} />
      ))}
    </div>
  );
};
