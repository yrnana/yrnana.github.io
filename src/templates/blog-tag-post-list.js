import React from 'react'
import { Link, graphql } from 'gatsby'

export default function BlogTagPostListTemplate({
	data,
	pageContext,
	location,
}) {
	const { tag } = pageContext
	const { edges, totalCount } = data.allMarkdownRemark
	const tagHeader = `${totalCount} post${
		totalCount === 1 ? '' : 's'
	} tagged with "${tag}"`

	return (
		<div>
			<h1>{tagHeader}</h1>
			<ul>
				{edges.map(({ node }) => {
					const { slug } = node.fields
					const { title } = node.frontmatter
					return (
						<li key={slug}>
							<Link to={slug}>{title}</Link>
						</li>
					)
				})}
			</ul>
			{/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
			<Link to="/tags">All tags</Link>
		</div>
	)
}

export const pageQuery = graphql`
	query($tag: String) {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`
