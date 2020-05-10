import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostTemplate from '../components/post/one/PostTemplate'

export default function BlogPostTemplate({ data, pageContext, location }) {
	const post = data.mdx

	return (
		<Layout location={location}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<PostTemplate post={post} {...pageContext} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query($id: String) {
		mdx(id: { eq: $id }) {
			id
			body
			excerpt
			fields {
				slug
			}
			frontmatter {
				title
				date
				description
				tags
			}
			tableOfContents
		}
	}
`
