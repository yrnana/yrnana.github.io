import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostListTemplate from '../components/post/PostListTemplate'

export default function IndexPage({ data, pageContext, location }) {
	const posts = data.allMdx.edges
	const pageInfo = data.allMdx.pageInfo

	return (
		<Layout location={location}>
			<SEO />
			<PostListTemplate posts={posts} pageInfo={pageInfo} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
			edges {
				node {
					id
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
