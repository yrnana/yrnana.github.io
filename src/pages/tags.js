import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import Tags from '../components/tag/Tags'

export default function TagsPage({ data, pageContext, location }) {
	const tags = data.allMdx.group

	return (
		<Layout>
			<SEO title="Tags" description="Tags Page" />
			<Tags tags={tags} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allMdx(limit: 2000) {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`
