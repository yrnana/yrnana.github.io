import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostListTemplate from '../components/post/PostListTemplate'

export default function IndexPage({ data, pageContext, location }) {
	const posts = data.allMarkdownRemark.edges
	const pageInfo = data.allMarkdownRemark.pageInfo

	return (
		<Layout location={location}>
			<SEO />
			<PostListTemplate posts={posts} pageInfo={pageInfo} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			limit: 5
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
						tags
					}
				}
			}
			pageInfo {
				currentPage
				pageCount
			}
		}
	}
`
