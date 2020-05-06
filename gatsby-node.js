const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { kebabCase } = require('lodash')

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const result = await graphql(
		`
			{
				postsRemark: allMarkdownRemark(
					sort: { fields: [frontmatter___date], order: DESC }
					limit: 1000
				) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
								tags
							}
						}
					}
				}
				tagsGroup: allMarkdownRemark(limit: 2000) {
					group(field: frontmatter___tags) {
						fieldValue
					}
				}
			}
		`
	)

	if (result.errors) {
		throw result.errors
	}

	// Create single post pages.
	const posts = result.data.postsRemark.edges
	posts.forEach((post, index) => {
		const previous =
			index === posts.length - 1 ? null : posts[index + 1].node
		const next = index === 0 ? null : posts[index - 1].node

		createPage({
			path: post.node.fields.slug,
			component: path.resolve(`./src/templates/blog-post.js`),
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		})
	})

	// Create tag-post-list pages
	const tags = result.data.tagsGroup.group
	tags.forEach(tag => {
		createPage({
			path: `/tags/${kebabCase(tag.fieldValue)}/`,
			component: path.resolve(`./src/templates/blog-tag-post-list.js`),
			context: {
				tag: tag.fieldValue,
			},
		})
	})

	// Create post-list pages
	const postsPerPage = 2
	const numPages = Math.ceil(posts.length / postsPerPage)
	Array.from({ length: numPages }).forEach((_, i) => {
		createPage({
			path: `/page/${i + 1}/`,
			component: path.resolve('./src/templates/blog-post-list.js'),
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages,
				currentPage: i + 1,
			},
		})
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: { 'react-dom': '@hot-loader/react-dom' },
		},
	})
}
