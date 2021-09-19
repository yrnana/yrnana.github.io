import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { action } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'styles/globals.css';

/** @type {import("@storybook/addons").Parameters } */
export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
};

/** @type {import("@storybook/addons").BaseDecorators } */
export const decorators = [
  (StoryFn) => (
    <MemoryRouterProvider
      url="/"
      onPush={action('push')}
      onReplace={action('replace')}
    >
      {StoryFn()}
    </MemoryRouterProvider>
  ),
];
