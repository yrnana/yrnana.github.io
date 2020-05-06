import React from 'react'
import { graphql } from 'gatsby'

export default function BlogPostListTemplate({ data, pageContext, location }) {
	const posts = data.allMarkdownRemark.edges
	// const { currentPage, numPages } = pageContext
	// const isFirst = currentPage === 1
	// const isLast = currentPage === numPages
	// const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
	// const nextPage = (currentPage + 1).toString()

	return (
		<>
			{posts.map(({ node }) => {
				const title = node.frontmatter.title || node.fields.slug
				return <div key={node.fields.slug}>{title}</div>
			})}
		</>
	)
}

export const pageQuery = graphql`
	query($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "DD MMMM, YYYY")
						title
					}
				}
			}
		}
	}
`
