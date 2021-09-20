import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="my-10">{children}</main>
      <footer className="my-4 sm:my-6 text-center text-gray-700">
        Copyright &copy; 2021 Nana
      </footer>
    </div>
  );
};

export default Layout;
