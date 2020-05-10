import React from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import TagList from '../TagList'

import { rhythm } from '../../../utils/typography'
import { md } from '../../../utils/breakpoints'
import {
	textSecondary,
	markdown,
	prismStyles,
	marginTransition,
} from '../../../utils/styles'
import { formatDate } from '../../../utils/functions'

const Header = styled.header`
	text-align: center;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(2.25)};
	${marginTransition}
	@media (min-width: ${md}) {
		margin-bottom: ${rhythm(2.5)};
	}
`

const Title = styled.h1`
	margin-bottom: ${rhythm(0.5)};
	font-weight: 900;
`

function Post({ post }) {
	return (
		<article>
			<Header>
				<Title>{post.frontmatter.title}</Title>
				<time dateTime={post.frontmatter.date} css={textSecondary}>
					{formatDate(post.frontmatter.date)}
				</time>
			</Header>
			<section css={markdown}>
				<Global styles={prismStyles} />
				<MDXRenderer>{post.body}</MDXRenderer>
			</section>
			<TagList tags={post.frontmatter.tags} />
		</article>
	)
}

export default Post
