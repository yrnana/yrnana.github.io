import { useMemo } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { LeftIcon, RightIcon } from '~/components/common/Icon';

const pageItemClassName = 'w-10 py-2 text-center';
const iconClassName = 'flex justify-center';

const Pagination: React.VFC<Omit<Pageable<unknown>, 'data'>> = ({
  first,
  last,
  page,
  totalPages,
}) => {
  const pages = useMemo(
    () => getPagination(totalPages, page),
    [totalPages, page],
  );

  return (
    <div className="flex flex-row flex-nowrap items-center justify-center mt-8">
      {first ? (
        <div className={cx('text-gray-300', pageItemClassName, iconClassName)}>
          <LeftIcon />
        </div>
      ) : (
        <Link
          href={{
            pathname: '/page/[page]',
            query: { page: page - 1 },
          }}
        >
          <a className={cx(pageItemClassName, iconClassName)}>
            <LeftIcon />
          </a>
        </Link>
      )}
      {pages.map((item, i) => (
        <PaginationItem key={`${item.page}_${i}`} {...item} />
      ))}
      {last ? (
        <div className={cx('text-gray-300', pageItemClassName, iconClassName)}>
          <RightIcon />
        </div>
      ) : (
        <Link
          href={{
            pathname: '/page/[page]',
            query: { page: page + 1 },
          }}
        >
          <a className={cx(pageItemClassName, iconClassName)}>
            <RightIcon />
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;

interface PaginationItemProps {
  isPage: boolean;
  isCurrentPage: boolean;
  page: string | number;
}

const PaginationItem: React.VFC<PaginationItemProps> = ({
  isPage,
  isCurrentPage,
  page,
}) => {
  if (isPage && !isCurrentPage) {
    return (
      <Link
        href={{
          pathname: '/page/[page]',
          query: { page },
        }}
      >
        <a className={pageItemClassName}>{page}</a>
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
  totalPages: number,
  page: number,
): PaginationItemProps[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, n) => ({
      isPage: true,
      isCurrentPage: n + 1 === page,
      page: n + 1,
    }));
  }

  let pages: (number | string)[];
  if (page <= 4) {
    pages = [1, 2, 3, 4, 5, '…', totalPages];
  } else if (page >= totalPages - 3) {
    pages = [
      1,
      '…',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pages = [1, '…', page - 1, page, page + 1, '…', totalPages];
  }
  return pages.map((p) => ({
    isPage: typeof p === 'number',
    isCurrentPage: p === page,
    page: p,
  }));
}
