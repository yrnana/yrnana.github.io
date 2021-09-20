import { ExclamationCircle } from '~/components/common/Icon';

const NoData: React.VFC = () => {
  return (
    <div className="text-center py-20">
      <div className="flex items-center justify-center text-gray-300">
        <ExclamationCircle />
      </div>
      <div className="mt-4 text-gray-300">No Data</div>
    </div>
  );
};

export default NoData;
