import { useEffect } from 'react';

type GoogleAdsenseProps = {
  slot: string;
  client?: string;
  format?: string;
};

const GoogleAdsense = ({
  slot,
  client = 'ca-pub-4675264961434940',
  format = 'auto',
}: GoogleAdsenseProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAdsense;
