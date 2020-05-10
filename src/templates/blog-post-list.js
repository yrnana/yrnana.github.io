import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostListTemplate from '../components/post/list/PostListTemplate'

export default function BlogPostListTemplate({ data, pageContext, location }) {
	const posts = data.allMdx.edges
	const pageInfo = data.allMdx.pageInfo

	const title =
		pageInfo.currentPage === 1 ? null : `Page ${pageInfo.currentPage}`

	return (
		<Layout location={location}>
			<SEO title={title} />
			<PostListTemplate posts={posts} pageInfo={pageInfo} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query($skip: Int!, $limit: Int!) {
		allMdx(
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					id
					excerpt
					fields {
						slug
					}
					frontmatter {
						title
						date
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
