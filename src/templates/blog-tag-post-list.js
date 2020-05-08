import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { kebabCase } from 'lodash'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostListTemplate from '../components/post/PostListTemplate'
import { rhythm } from '../utils/typography'
import { primaryColor } from '../utils/styles'

const Title = styled.h2`
	text-align: center;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(0.75)};
	font-weight: 400;
	strong {
		${primaryColor}
	}
`

export default function BlogTagPostListTemplate({
	data,
	pageContext,
	location,
}) {
	const { tag } = pageContext
	const posts = data.allMdx.edges
	const pageInfo = data.allMdx.pageInfo

	return (
		<Layout location={location}>
			<SEO title={`Tag : ${tag}`} />
			<Title>
				Post tagged with <strong>{tag}</strong>
			</Title>
			<PostListTemplate
				posts={posts}
				pageInfo={{ baseUrl: `/tags/${kebabCase(tag)}`, ...pageInfo }}
			/>
		</Layout>
	)
}

export const pageQuery = graphql`
	query($tag: String, $skip: Int!, $limit: Int!) {
		allMdx(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
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
