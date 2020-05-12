import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import TagList from '../TagList'

import {
	fontSizeSmall,
	textPrimary,
	textSecondary,
	primaryColor,
	inlineSpacing,
} from '../../../utils/styles'
import { rhythm } from '../../../utils/typography'
import { formatDate } from '../../../utils/functions'
import { md } from '../../../utils/breakpoints'

const List = styled.ul`
	list-style: none;
	margin: 0;
	li {
		padding-top: ${rhythm(1.75)};
		padding-bottom: ${rhythm(1.75)};
		margin-bottom: 0;
		border-bottom: 1px solid #e5e5e5;
	}
`

const PostInfo = styled.div`
	${inlineSpacing}
	margin-top: ${rhythm(1 / 1.5)};
	@media (max-width: ${md}) {
		time {
			flex-basis: 100%;
			width: 100%;
			margin-right: 0;
			margin-bottom: ${rhythm(0.5)};
		}
		small {
			display: none;
		}
	}
`

function PostList({ posts }) {
	return (
		<List>
			{posts.map(({ node }) => (
				<li key={node.id}>
					<h2
						css={css`
							a {
								${textPrimary}
								&:hover {
									${primaryColor}
								}
							}
						`}
					>
						<Link to={node.fields.slug}>
							{node.frontmatter.title}
						</Link>
					</h2>
					<section>
						<p
							dangerouslySetInnerHTML={{
								__html:
									node.frontmatter.description ||
									node.excerpt,
							}}
						/>
					</section>
					<PostInfo>
						<time
							dateTime={node.frontmatter.date}
							css={[fontSizeSmall, textSecondary]}
						>
							{formatDate(node.frontmatter.date)}
						</time>
						<TagList tags={node.frontmatter.tags} isList />
					</PostInfo>
				</li>
			))}
		</List>
	)
}

export default PostList
