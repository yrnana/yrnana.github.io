/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description = '', lang = 'ko', meta = [], title = '' }) => {
	const { site } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`)

	const metaDescription = description || site.siteMetadata.description
	const titleTemplate = title
		? `%s | ${site.siteMetadata.title}`
		: site.siteMetadata.title

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={title}
			titleTemplate={titleTemplate}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(meta)}
			link={[
				{
					href:
						'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap',
					rel: 'stylesheet',
				},
			]}
		/>
	)
}

export default SEO
