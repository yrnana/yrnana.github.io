import React from 'react'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'

export default function NotFoundPage({ location }) {
	return (
		<Layout location={location}>
			<SEO title="404: Not Found" />
			<h1>404 Not Found</h1>
		</Layout>
	)
}
