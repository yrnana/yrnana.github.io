import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

function SEO({ title = null, description = '', image = null, meta = [] }) {
	const { site } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					siteUrl
				}
			}
		}
	`)

	const metaDescription = description || site.siteMetadata.description
	const metaTitle = `${title ? `${title} | ` : ''}` + site.siteMetadata.title
	const metaImage =
		image && image.src ? `${site.siteMetadata.siteUrl}${image.src}` : null

	return (
		<Helmet
			htmlAttributes={{ lang: 'ko' }}
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
					name: `twitter:title`,
					content: metaTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			]
				.concat(
					metaImage
						? [
								{
									property: 'og:image',
									content: metaImage,
								},
								{
									property: 'og:image:width',
									content: image.width,
								},
								{
									property: 'og:image:height',
									content: image.height,
								},
								{
									name: 'twitter:card',
									content: 'summary_large_image',
								},
						  ]
						: [
								{
									name: 'twitter:card',
									content: 'summary',
								},
						  ]
				)
				.concat(meta)}
			defer={false}
			link={[
				{
					href:
						'https://cdn.jsdelivr.net/npm/font-kopubworld@1.0.3/css/dotum.css',
					rel: 'stylesheet',
				},
			]}
		/>
	)
}

export default SEO
