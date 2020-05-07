import React from 'react'
import styled from '@emotion/styled'
import { rhythm } from '../../utils/typography'
import { textSecondary, markdown } from '../../utils/styles'

const Header = styled.header`
	text-align: center;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(2.5)};
`

const Title = styled.h1`
	margin-bottom: ${rhythm(0.5)};
	font-weight: 900;
`

const Content = styled.section`
	margin-bottom: ${rhythm(1)};
	${markdown}
`

function Post({ post }) {
	return (
		<article>
			<Header>
				<Title>{post.frontmatter.title}</Title>
				<p css={textSecondary}>{post.frontmatter.date}</p>
			</Header>
			<Content dangerouslySetInnerHTML={{ __html: post.html }} />
		</article>
	)
}

export default Post
