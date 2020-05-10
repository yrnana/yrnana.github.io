import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { formatDate } from '../../utils/functions'
import { textSecondary, fontSizeSmall } from '../../utils/styles'
import { rhythm } from '../../utils/typography'

const ListItem = styled.li`
	a {
		display: inline-flex;
		align-items: center;
		time {
			margin-right: ${rhythm(1)};
			${fontSizeSmall}
			${textSecondary}
		}
		&:hover {
			time {
				color: rgba(0, 0, 0, 0.4);
			}
		}
	}
`

function ArchiveItem({ node }) {
	return (
		<ListItem>
			<Link to={node.fields.slug}>
				<time dateTime={node.frontmatter.date}>
					{formatDate(node.frontmatter.date, false)}
				</time>
				<span>{node.frontmatter.title}</span>
			</Link>
		</ListItem>
	)
}

export default ArchiveItem
