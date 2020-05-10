import React from 'react'
import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'

export default function AboutPage({ data, pageContext, location }) {
	return (
		<Layout location={location}>
			<SEO title="About" />
			About
		</Layout>
	)
}
