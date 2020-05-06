import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import { Typography, Space, Tag } from 'antd'
import styled from 'styled-components'
import { rhythm } from '../../utils/typography'

const List = styled.ul`
	list-style: none;
	margin: 0;
	li {
		padding: ${rhythm(1.5)} 0;
		margin-bottom: 0;
		border-bottom: 1px solid #e5e5e5;
	}
`

const Title = styled(Typography.Title)`
	a {
		color: rgba(0, 0, 0, 0.85);
		&:hover {
			color: #7467ef;
		}
	}
`

const Footer = styled(Space)`
	margin-top: ${rhythm(0.5)};
`

const FormattedDate = styled(Typography.Text)`
	font-size: ${rhythm(0.45)};
`

function PostList({ posts }) {
	return (
		<List>
			{posts.map(({ node }) => (
				<li key={node.fields.slug}>
					<Title level={3}>
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
					<Footer size="middle">
						<FormattedDate type="secondary">
							{node.frontmatter.date}
						</FormattedDate>
						{node.frontmatter.tags && (
							<>
								<small>-</small>
								<TagList tags={node.frontmatter.tags} />
							</>
						)}
					</Footer>
				</li>
			))}
		</List>
	)
}

function TagList({ tags }) {
	return (
		<div>
			{tags.map(tag => (
				<Tag key={tag}>
					<Link to={`/tags/${kebabCase(tag)}/pages/1`}>{tag}</Link>
				</Tag>
			))}
		</div>
	)
}

export default PostList
