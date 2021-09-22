import Link from 'next/link';
import ActiveLink from '~/components/layout/ActiveLink';
import { BLOG_TITLE } from '~/helpers/constants';

const Header: React.VFC = () => {
  return (
    <header className="mt-4 sm:mt-6 flex flex-row items-center">
      <div className="mr-auto">
        <Link href="/">
          <a className="select-none text-2xl font-semibold font-mono hover:text-purple-500">
            {BLOG_TITLE}
          </a>
        </Link>
      </div>
      <nav className="flex flex-row items-center space-x-4">
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/archive">Archive</ActiveLink>
        <ActiveLink href="/tags">Tags</ActiveLink>
      </nav>
    </header>
  );
};

export default Header;
