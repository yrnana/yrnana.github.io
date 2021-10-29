import { graphql, useStaticQuery } from 'gatsby';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery<LayoutQuery>(
    graphql`
      query Layout {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `,
  );

  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <Header title={site?.siteMetadata?.title!} />
      <main className="py-10 flex-grow">{children}</main>
      <footer className="mb-4 sm:mb-6 text-center text-gray-700">
        <span className="mr-2 text-sm sm:text-base">
          Copyright &copy; {new Date().getFullYear()}
        </span>
        <span>{site?.siteMetadata?.author!}</span>
      </footer>
    </div>
  );
};

export default Layout;
