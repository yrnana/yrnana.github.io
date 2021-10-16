module.exports = {
  siteMetadata: {
    author: 'nana',
    title: 'nana.log',
    siteUrl: 'https://yrnana.github.io',
    defaultImage: '/nana.log.png',
    commentIssueRepo: 'yrnana/yrnana.github.io-comment',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: 'JetBrains Mono',
            weights: ['400', '500', '600'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-CXQWBSP21V', // Google Analytics
        ],
      },
    },
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require('remark-breaks')],
        rehypePlugins: [require('rehype-highlight')],
        gatsbyRemarkPlugins: [
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
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
        theme_color: '#8b5cf6',
        display: 'minimal-ui',
        icon: 'static/favicon.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
  ],
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
};
