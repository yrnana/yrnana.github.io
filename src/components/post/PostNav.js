import React from 'react'
import { Link } from 'gatsby'

function PostNav({ previous, next }) {
	return (
		<nav>
			<ul
				style={{
					display: `flex`,
					flexWrap: `wrap`,
					justifyContent: `space-between`,
					listStyle: `none`,
					padding: 0,
				}}
			>
				<li>
					{previous && (
						<Link to={previous.fields.slug} rel="prev">
							← {previous.frontmatter.title}
						</Link>
					)}
				</li>
				<li>
					{next && (
						<Link to={next.fields.slug} rel="next">
							{next.frontmatter.title} →
						</Link>
					)}
				</li>
			</ul>
		</nav>
	)
}

export default PostNav
