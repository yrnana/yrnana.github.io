import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import * as NextImage from 'next/image';
import { action } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '~/styles/globals.css';

// mock next/image
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => (
    <div>
      <img
        src={props.src}
        alt="replaced next/image"
        style={{ display: 'block', objectFit: 'contain' }}
      />
    </div>
  ),
});

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
