import { useMemo } from 'react';
import cx from 'classnames';
import { graphql, Link } from 'gatsby';
import { LeftIcon, RightIcon } from '~/components/common/Icon';

const pageItemClassName = 'w-10 py-2 text-center';
const iconClassName = 'flex justify-center';

const Pagination: React.VFC<PaginationFragment> = ({
  currentPage,
  pageCount,
  hasPreviousPage,
  hasNextPage,
}) => {
  const pages = useMemo(
    () => getPagination(currentPage, pageCount),
    [currentPage, pageCount],
  );

  return (
    <div className="flex flex-row flex-nowrap items-center justify-center mt-8">
      {hasPreviousPage ? (
        <Link
          to={`/page/${currentPage - 1}`}
          className={cx(pageItemClassName, iconClassName)}
        >
          <LeftIcon />
        </Link>
      ) : (
        <div className={cx('text-gray-300', pageItemClassName, iconClassName)}>
          <LeftIcon />
        </div>
      )}
      {pages.map((item, i) => (
        <PaginationItem key={`${item.page}_${i}`} {...item} />
      ))}
      {hasNextPage ? (
        <Link
          to={`/page/${currentPage + 1}`}
          className={cx(pageItemClassName, iconClassName)}
        >
          <RightIcon />
        </Link>
      ) : (
        <div className={cx('text-gray-300', pageItemClassName, iconClassName)}>
          <RightIcon />
        </div>
      )}
    </div>
  );
};

export default Pagination;

interface PaginationItemProps {
  page: string | number;
  isPage: boolean;
  isCurrentPage: boolean;
}

const PaginationItem: React.VFC<PaginationItemProps> = ({
  page,
  isPage,
  isCurrentPage,
}) => {
  if (isPage && !isCurrentPage) {
    return (
      <Link to={`/page/${page}`} className={pageItemClassName}>
        {page}
      </Link>
    );
  }
  return (
    <div
      className={cx(pageItemClassName, 'cursor-default', {
        'text-purple-500': isCurrentPage,
      })}
    >
      {page}
    </div>
  );
};

function getPagination(
  currentPage: number,
  pageCount: number,
): PaginationItemProps[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, n) => ({
      isPage: true,
      isCurrentPage: n + 1 === currentPage,
      page: n + 1,
    }));
  }

  let pages: (number | string)[];
  if (currentPage <= 4) {
    pages = [1, 2, 3, 4, 5, '…', pageCount];
  } else if (currentPage >= pageCount - 3) {
    pages = [
      1,
      '…',
      pageCount - 4,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  } else {
    pages = [
      1,
      '…',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '…',
      pageCount,
    ];
  }
  return pages.map((p) => ({
    isPage: typeof p === 'number',
    isCurrentPage: p === currentPage,
    page: p,
  }));
}

export const paginationFragment = graphql`
  fragment Pagination on PageInfo {
    currentPage
    pageCount
    hasNextPage
    hasPreviousPage
  }
`;
