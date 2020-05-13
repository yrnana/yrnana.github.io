import React from 'react'
import styled from '@emotion/styled'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import TagList from '../TagList'
import Series from './Series'

import { rhythm } from '../../../utils/typography'
import { md } from '../../../utils/breakpoints'
import {
	textSecondary,
	markdown,
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

function Post({ post, series }) {
	return (
		<article>
			<Header>
				<Title>{post.frontmatter.title}</Title>
				<time dateTime={post.frontmatter.date} css={textSecondary}>
					{formatDate(post.frontmatter.date)}
				</time>
			</Header>
			{series && <Series series={series} />}
			<section css={markdown}>
				<MDXRenderer>{post.body}</MDXRenderer>
			</section>
			<TagList tags={post.frontmatter.tags} />
		</article>
	)
}

export default Post
