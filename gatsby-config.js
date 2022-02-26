module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    author: 'nana',
    title: 'nana.log',
    siteUrl: 'https://yrnana.dev',
    defaultImage: '/nana.log.png',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-NT3GFVWJPV', // yrnana.dev
        ],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `One Dark Pro`,
              extensions: [
                `${__dirname}/vendor/one-dark-pro.vsix`,
                `${__dirname}/vendor/graphql.vsix`,
                `${__dirname}/vendor/prisma.vsix`,
                `${__dirname}/vendor/dotenv.vsix`,
                `${__dirname}/vendor/rest-client.vsix`,
              ],
              injectStyles: false,
              inlineCode: {
                marker: '↦',
              },
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`,
              isIconAfterHeader: true,
            },
          },
          `gatsby-remark-katex`,
          `gatsby-remark-breaks`,
          `gatsby-remark-embed`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: `${__dirname}/_contents/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/_contents/assets`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'nana.log',
        short_name: 'nana.log',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'static/favicon.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
