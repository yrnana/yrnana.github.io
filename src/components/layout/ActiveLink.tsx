import { GatsbyLinkProps, Link } from 'gatsby';

export const ActiveLink: React.VFC<GatsbyLinkProps<unknown>> = ({
  to,
  children,
}) => {
  return (
    <Link
      to={to}
      className="hover:text-violet-500 text-sm sm:text-base"
      activeClassName="text-violet-500"
    >
      {children}
    </Link>
  );
};
