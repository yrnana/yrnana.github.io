import React from 'react'
import { Typography, Empty } from 'antd'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'

const { Text } = Typography

export default function NotFoundPage({ location }) {
	return (
		<Layout location={location}>
			<SEO title="404: Not Found" />
			<Empty description={<Text>404 Not Found</Text>} />
		</Layout>
	)
}
