import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { getPathFromUrl } from '~/helpers/utils';

export interface ActiveLinkProps {
  href: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const router = useRouter();
  const isActive = getPathFromUrl(router?.asPath) === href;

  return (
    <Link href={href}>
      <a
        className={cx('hover:text-purple-500', {
          'text-purple-500': isActive,
        })}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
