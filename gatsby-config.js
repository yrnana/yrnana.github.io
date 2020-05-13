require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: `Nana's Log`,
		author: {
			name: `Yuri Na`,
			summary: `LG CNS Enterprise Application Development Associate`,
		},
		description: `Nana's Dev Log`,
		siteUrl: `https://yurinadev.github.io/`,
		social: {
			github: 'YuriNaDev',
		},
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/posts`,
				name: `posts`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				rehypePlugins: [require('rehype-slug')],
				gatsbyRemarkPlugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 600,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1rem`,
						},
					},
					{
						resolve: 'gatsby-remark-external-links',
						options: {
							target: '_blank',
						},
					},
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					`gatsby-remark-prismjs`,
					{
						resolve: `gatsby-remark-katex`,
						options: {
							strict: `ignore`,
						},
					},
				],
			},
		},
		`gatsby-plugin-catch-links`,
		`gatsby-plugin-remove-trailing-slashes`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: `Noto Sans KR`,
						subsets: [`latin`, `korean`],
						variants: [`400`, `700`, `900`],
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: process.env.GATSBY_GOOGLE_ANALYTICS,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sitemap`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Nana's Log`,
				short_name: `NanaLog`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#7467ef`,
				display: `standalone`,
				icon: `content/assets/gatsby-icon.png`,
			},
		},
		{
			resolve: `gatsby-plugin-feed-mdx`,
			options: {
				query: `{
					site {
						siteMetadata {
							title
							description
							siteUrl
						}
					}
				}`,
				feeds: [
					{
						serialize: ({ query: { site, allMdx } }) => {
							return allMdx.edges.map(edge => {
								return Object.assign(
									{},
									edge.node.frontmatter,
									{
										description:
											edge.node.frontmatter.description ||
											edge.node.excerpt,
										url:
											site.siteMetadata.siteUrl +
											edge.node.fields.slug,
										guid:
											site.siteMetadata.siteUrl +
											edge.node.fields.slug,
										language: 'ko-kr',
									}
								)
							})
						},
						query: `{
							allMdx(sort: { order: DESC, fields:  [frontmatter___date] }) {
								edges {
									node {
										excerpt
										fields { 
											slug
										}
										frontmatter {
											date
											title
											description
										}
									}
								}
							}
						}`,
						output: '/rss.xml',
						title: "Nana's Log : RSS Feed",
						match: '^/posts/',
					},
				],
			},
		},
	],
}
