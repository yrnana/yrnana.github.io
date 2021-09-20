import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getMarkdownContent } from '~/helpers/api';
import MarkdownTemplate from '~/templates/MarkdownTemplate';

type PageProps = {
  content: string;
};

const AboutPage: NextPage<PageProps> = ({ content }) => {
  return (
    <>
      <Seo title="about" path="/about" />
      <MarkdownTemplate content={content} />
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const content = await getMarkdownContent('about');
  return {
    props: {
      content,
    },
  };
};
