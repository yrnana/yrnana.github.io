import { ExclamationCircle, Seo } from '~/components/common';
import { Layout } from '~/components/layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="Page Not Found" noindex />
      <div className="text-center py-20">
        <ExclamationCircle
          width={14}
          height={14}
          className="mx-auto text-red-500"
        />
        <div className="font-bold text-9xl mt-2 mb-4">404</div>
        <div className="font-semibold text-2xl text-slate-600">
          Page Not Found
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
