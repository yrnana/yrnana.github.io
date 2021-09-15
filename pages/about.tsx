import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import Layout from '~/components/layout/Layout';

type PageProps = {
  //
};

const AboutPage: NextPage<PageProps> = ({}) => {
  return (
    <Layout>
      <Seo title="About" />
      About
    </Layout>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  return {
    props: {},
  };
};
