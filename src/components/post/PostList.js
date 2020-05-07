import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from 'styled-components'

const List = styled.ul`
	list-style: none;
	margin: 0;
	li {
		padding: 2.5rem 0;
		margin-bottom: 0;
		border-bottom: 1px solid #e5e5e5;
	}
`

const Title = styled.h3`
	a {
		color: rgba(0, 0, 0, 0.85);
		&:hover {
			color: #7467ef;
		}
	}
`

const Footer = styled.div`
	margin-top: 0.75rem;
	display: flex;
	align-items: center;
`

const FormattedDate = styled.span`
	font-size: 0.8rem;
	color: rgba(0, 0, 0, 0.45);
`

function PostList({ posts }) {
	return (
		<List>
			{posts.map(({ node }) => (
				<li key={node.fields.slug}>
					<Title>
						<Link to={node.fields.slug}>
							{node.frontmatter.title}
						</Link>
					</Title>
					<section>
						<p
							dangerouslySetInnerHTML={{
								__html:
									node.frontmatter.description ||
									node.excerpt,
							}}
						/>
					</section>
					<Footer>
						<FormattedDate>{node.frontmatter.date}</FormattedDate>
						{node.frontmatter.tags && (
							<TagList tags={node.frontmatter.tags} />
						)}
					</Footer>
				</li>
			))}
		</List>
	)
}

function TagList({ tags }) {
	return (
		<>
			<small>-</small>
			<div>
				{/* {tags.map(tag => (
					<Tag key={tag}>
						<Link to={`/tags/${kebabCase(tag)}/pages/1`}>
							{tag}
						</Link>
					</Tag>
				))} */}
			</div>
		</>
	)
}

export default PostList
