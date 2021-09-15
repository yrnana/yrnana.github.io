import React from 'react';
import { useRouter } from 'next/router';
import { getPathFromUrl } from '~/helpers/utils';

export interface ActiveLinkProps {
  href: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const router = useRouter();

  // TODO: active link color
  const isActive = getPathFromUrl(router?.asPath) === href;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default ActiveLink;
