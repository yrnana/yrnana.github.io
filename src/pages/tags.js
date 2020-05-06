import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'

export default function TagsPage({ data, pageContext, location }) {
	const group = data.allMarkdownRemark.group

	return (
		<div>
			<div>
				<h1>Tags</h1>
				<ul>
					{group.map(tag => (
						<li key={tag.fieldValue}>
							<Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
								{tag.fieldValue} ({tag.totalCount})
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
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
