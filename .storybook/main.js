const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type {import("@storybook/react/types").StorybookConfig } */
module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/stories/**/*.stories.tsx'],
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
  webpackFinal: async (config, { isServer }) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify'),
      };
    }
    return config;
  },
};
