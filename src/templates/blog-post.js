import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'
import PostTemplate from '../components/post/one/PostTemplate'

export default function BlogPostTemplate({ data, pageContext, location }) {
	const { post, series } = data
	const { next, previous } = pageContext

	return (
		<Layout location={location}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<PostTemplate
				post={post}
				series={
					pageContext.series
						? { name: pageContext.series, posts: [...series.edges] }
						: null
				}
				next={next}
				previous={previous}
			/>
		</Layout>
	)
}

export const pageQuery = graphql`
	query($id: String, $series: String) {
		post: mdx(id: { eq: $id }) {
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
		series: allMdx(
			sort: { fields: [frontmatter___date], order: ASC }
			filter: { frontmatter: { series: { eq: $series, ne: null } } }
			limit: 2000
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`
