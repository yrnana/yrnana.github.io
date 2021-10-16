import Layout from '~/components/layout/Layout';

const MarkdownTemplate: React.FC = ({ children }) => {
  return (
    <Layout>
      <div className="markdown">{children}</div>
    </Layout>
  );
};

export default MarkdownTemplate;
