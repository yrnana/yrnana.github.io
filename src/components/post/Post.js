import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../../utils/typography'

const Header = styled.header`
	text-align: center;
	margin-bottom: ${rhythm(2)};
`

const Title = styled.h1`
	margin-top: ${rhythm(0.5)};
	margin-bottom: ${rhythm(0.5)};
	font-weight: 700;
`

const Content = styled.section`
	margin-bottom: ${rhythm(1.5)};
`

function Post({ post }) {
	return (
		<article>
			<Header>
				<Title>{post.frontmatter.title}</Title>
				<p>{post.frontmatter.date}</p>
			</Header>
			<Content
				// className="ant-typography"
				dangerouslySetInnerHTML={{ __html: post.html }}
			/>
		</article>
	)
}

export default Post
