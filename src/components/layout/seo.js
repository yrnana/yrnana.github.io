import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEO = ({ description = '', lang = 'ko', meta = [], title = null }) => {
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
	const metaTitle = `${title ? `${title} | ` : ''}` + site.siteMetadata.title

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={metaTitle}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					property: `og:title`,
					content: metaTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:title`,
					content: metaTitle,
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
