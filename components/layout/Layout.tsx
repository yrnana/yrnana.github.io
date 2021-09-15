import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      <main>{children}</main>
      {/* TODO: footer design */}
      <footer className="text-center">2021 &copy; nana</footer>
    </div>
  );
};

export default Layout;
