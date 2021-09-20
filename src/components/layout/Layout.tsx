import { AUTHOR_NAME } from '~/helpers/constants';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <Header />
      <main className="py-10 flex-grow">{children}</main>
      <footer className="mb-4 sm:mb-6 text-center text-gray-700">
        Copyright &copy; 2021 {AUTHOR_NAME}
      </footer>
    </div>
  );
};

export default Layout;
