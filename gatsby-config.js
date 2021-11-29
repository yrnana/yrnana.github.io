module.exports = {
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
    `gatsby-plugin-remove-trailing-slashes`,
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
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '↦',
              aliases: {
                sh: 'bash',
              },
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-katex`,
          `gatsby-remark-embed`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-breaks`,
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
