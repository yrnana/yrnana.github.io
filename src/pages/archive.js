import React from 'react'
import { graphql } from 'gatsby'
import { orderBy } from 'lodash'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import Archive from '../components/archive/Archive'

export default function ArchivePage({ data, pageContext, location }) {
	const archives = orderBy(data.allMdx.group, ['fieldValue'], ['desc'])

	return (
		<Layout location={location}>
			<SEO title="Archive" />
			<Archive archives={archives} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allMdx(limit: 2000, sort: { fields: frontmatter___date, order: DESC }) {
			group(field: fields___year) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							title
							date
						}
					}
				}
				fieldValue
			}
		}
	}
`
