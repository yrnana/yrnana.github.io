import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostTemplate from '../components/post/PostTemplate'

export default function BlogPostTemplate({ data, pageContext, location }) {
	const post = data.markdownRemark

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
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
	}
`
