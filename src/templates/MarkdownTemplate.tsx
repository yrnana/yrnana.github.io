import parse from 'html-react-parser';
import Layout from '~/components/layout/Layout';

export interface MarkdownTemplateProps {
  content: string;
}

const MarkdownTemplate: React.VFC<MarkdownTemplateProps> = ({ content }) => {
  return (
    <Layout>
      <div className="markdown">{parse(content)}</div>
    </Layout>
  );
};

export default MarkdownTemplate;
