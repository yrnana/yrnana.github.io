const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type {import("@storybook/react/types").StorybookConfig } */
module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  features: {
    previewCsfV3: true,
  },
  webpackFinal: async (config, options) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    config.node = {
      fs: 'empty',
    };
    return config;
  },
};
