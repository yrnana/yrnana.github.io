import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
	text-align: center;
	margin-bottom: 2rem;
`

const Title = styled.h1`
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	padding-bottom: 0;
	border-bottom: 0;
	font-weight: 700;
`

const Content = styled.section`
	margin-bottom: 1.5rem;
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
