import { GA_TRACKING_ID } from '~/helpers/constants';

export { GA_TRACKING_ID };

export function pageview(url: string): void {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

interface EventProps {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export function event({ action, category, label, value }: EventProps): void {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
