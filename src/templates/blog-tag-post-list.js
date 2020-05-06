import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostListTemplate from '../components/post/PostListTemplate'
import { rhythm, scale } from '../utils/typography'

const Title = styled.h2`
	text-align: center;
	margin-top: ${rhythm(0.5)};
	margin-bottom: ${rhythm(0.5)};
	font-weight: 400;
	${scale(0.5)}
	strong {
		color: #7467ef;
	}
`

export default function BlogTagPostListTemplate({
	data,
	pageContext,
	location,
}) {
	const { tag } = pageContext
	const posts = data.allMarkdownRemark.edges
	const pageInfo = data.allMarkdownRemark.pageInfo

	return (
		<Layout location={location}>
			<SEO title={`Tag : ${tag}`} />
			<Title level={3}>
				Post tagged with <strong>{tag}</strong>
			</Title>
			<PostListTemplate posts={posts} pageInfo={pageInfo} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query($tag: String, $skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
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
