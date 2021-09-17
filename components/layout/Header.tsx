import Link from 'next/link';
import ActiveLink from '~/components/layout/ActiveLink';

const Header: React.VFC = () => {
  return (
    <header className="flex flex-row items-center">
      <div className="mr-auto">
        <Link href="/">
          <a className="text-2xl font-semibold font-mono">nana.log</a>
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
