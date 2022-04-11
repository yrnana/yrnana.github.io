import { useEffect } from 'react';
import cx from 'classnames';

export type GoogleAdsenseProps = {
  slot: string;
  client?: string;
  format?: string;
  className?: string;
};

export const GoogleAdsense = ({
  slot,
  client = 'ca-pub-4675264961434940',
  format = 'auto',
  className,
}: GoogleAdsenseProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className={cx('adsbygoogle', className)}
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};
