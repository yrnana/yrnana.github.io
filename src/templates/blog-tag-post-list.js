import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { kebabCase } from 'lodash'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostListTemplate from '../components/post/list/PostListTemplate'

import { rhythm } from '../utils/typography'
import { primaryColor, marginTransition } from '../utils/styles'
import { md } from '../utils/breakpoints'

const Title = styled.h2`
	text-align: center;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(0.5)};
	font-weight: 400;
	${marginTransition}
	strong {
		${primaryColor}
	}
	@media (min-width: ${md}) {
		margin-bottom: ${rhythm(0.75)};
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
