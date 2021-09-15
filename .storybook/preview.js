import { RouterContext } from 'next/dist/shared/lib/router-context';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'tailwindcss/tailwind.css';

/** @type {import("@storybook/addons").Parameters } */
export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
};
