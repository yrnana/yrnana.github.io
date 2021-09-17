import React from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { getPathFromUrl } from '~/helpers/utils';

export interface ActiveLinkProps {
  href: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const router = useRouter();

  const isActive = getPathFromUrl(router?.asPath) === href;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={cx('hover:text-purple-500', {
        'text-purple-500': isActive,
      })}
    >
      {children}
    </a>
  );
};

export default ActiveLink;
