import type { NextPage } from 'next';
import Seo from '~/components/common/Seo';
import NotFoundTemplate from '~/templates/NotFoundTemplate';

const NotFound: NextPage = () => {
  return (
    <>
      <Seo title="about" />
      <NotFoundTemplate />
    </>
  );
};

export default NotFound;
