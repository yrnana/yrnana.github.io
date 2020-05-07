import React from 'react'
import { graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from '@emotion/styled'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import Tag from '../components/post/Tag'
import { spacing } from '../utils/styles'
import { rhythm } from '../utils/typography'

const Title = styled.h2`
	text-align: center;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(2.5)};
	font-weight: 700;
`

export default function TagsPage({ data, pageContext, location }) {
	const group = data.allMarkdownRemark.group

	function getColor(count) {
		if (count < 5) return 'purple'
		else if (count < 10) return 'blue'
		else if (count < 20) return 'green'
		else if (count < 30) return 'orange'
		else return 'magenta'
	}

	return (
		<Layout location={location}>
			<SEO title="Tags" />
			<Title>Tags</Title>
			<div css={spacing}>
				{group.map(tag => (
					<Tag
						key={tag.fieldValue}
						type={getColor(tag.totalCount)}
						to={`/tags/${kebabCase(tag.fieldValue)}/pages/1`}
						label={`${tag.fieldValue} (${tag.totalCount})`}
					/>
				))}
			</div>
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(limit: 2000) {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`
