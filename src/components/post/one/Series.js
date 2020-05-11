import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { rhythm } from '../../../utils/typography'
import { primaryColor, textSecondary } from '../../../utils/styles'

const Wrapper = styled.div`
	background: #f8f8f8;
	padding: ${rhythm(1)};
	margin-bottom: ${rhythm(2)};
	ol {
		margin-left: 0;
		margin-bottom: 0;
		counter-reset: item 0;
		li {
			list-style: none;
			&:last-child {
				margin-bottom: 0;
			}
			&::before {
				content: counter(item) '. ';
				counter-increment: item 1;
				margin-right: 0.25rem;
				${textSecondary}
			}
		}
	}
	a {
		${textSecondary}
		&.active {
			${primaryColor}
			pointer-events: none;
			cursor: pointer;
		}
	}
`

function Series({ series }) {
	return (
		<Wrapper>
			<h3>{series.name}</h3>
			<ol>
				{series.posts.map(({ node }) => (
					<li key={node.id}>
						<Link to={node.fields.slug} activeClassName="active">
							{node.frontmatter.title}
						</Link>
					</li>
				))}
			</ol>
		</Wrapper>
	)
}

export default Series
