import { Link } from 'gatsby';
import { ActiveLink } from './ActiveLink';

export const Header: React.VFC<{ title: string }> = ({ title }) => {
  return (
    <header className="mt-4 sm:mt-6 flex flex-row items-center">
      <div className="mr-auto">
        <Link
          to="/"
          className="select-none text-xl sm:text-2xl font-semibold font-mono hover:text-violet-500"
        >
          {title}
        </Link>
      </div>
      <nav className="flex flex-row items-center space-x-4">
        <ActiveLink to="/about">About</ActiveLink>
        <ActiveLink to="/archive">Archive</ActiveLink>
        <ActiveLink to="/tags">Tags</ActiveLink>
      </nav>
    </header>
  );
};
