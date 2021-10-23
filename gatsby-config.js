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
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require('remark-breaks')],
        rehypePlugins: [require('rehype-highlight')],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embed`,
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
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'static/favicon.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};