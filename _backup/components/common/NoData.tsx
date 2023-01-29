import { ExclamationCircle } from '~/components/common';

export const NoData: React.VFC = () => {
  return (
    <div className="text-center py-20">
      <div className="flex items-center justify-center text-slate-300">
        <ExclamationCircle />
      </div>
      <div className="mt-4 text-slate-300">No Data</div>
    </div>
  );
};
