import type { NextPage } from 'next';
import Seo from '~/components/common/Seo';
import NotFoundTemplate from '~/templates/NotFoundTemplate';

const NotFound: NextPage = () => {
  return (
    <>
      <Seo title="404 not found" path="/404" noindex />
      <NotFoundTemplate />
    </>
  );
};

export default NotFound;
