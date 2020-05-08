import React from 'react'
import { Link } from 'gatsby'
import { kebabCase, isEmpty } from 'lodash'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import {
	textPrimary,
	textSecondary,
	primaryColor,
	inlineSpacing,
} from '../../utils/styles'
import { rhythm } from '../../utils/typography'
import Tag from './Tag'

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
						<small css={textSecondary}>
							{node.frontmatter.date}
						</small>
						{!isEmpty(node.frontmatter.tags) && (
							<TagList tags={node.frontmatter.tags} />
						)}
					</PostInfo>
				</li>
			))}
		</List>
	)
}

function TagList({ tags }) {
	return (
		<>
			<small>-</small>
			<div
				css={css`
					${inlineSpacing}
					& > * {
						margin-right: 8px !important;
					}
				`}
			>
				{tags.map(tag => (
					<Tag
						key={tag}
						to={`/tags/${kebabCase(tag)}/pages/1`}
						label={tag}
					/>
				))}
			</div>
		</>
	)
}

export default PostList
