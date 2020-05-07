import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

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
	const titleTemplate = title ? `%s | ${site.siteMetadata.title}` : undefined

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={title || site.siteMetadata.title}
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
