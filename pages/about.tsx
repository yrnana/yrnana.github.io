import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import AboutTemplate from '~/templates/AboutTemplate';

type PageProps = {
  //
};

const AboutPage: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Seo title="About" />
      <AboutTemplate />
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  return {
    props: {},
  };
};
