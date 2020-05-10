import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'

import { textSecondary, primaryBgColor } from '../utils/styles'
import { rhythm } from '../utils/typography'

const Wrapper = styled.div`
	text-align: center;
	h1 {
		font-size: 150px;
		margin-bottom: 0;
	}
	h2 {
		margin-bottom: ${rhythm(1)};
	}
	p {
		${textSecondary}
		margin-bottom: ${rhythm(1.5)};
	}
	a {
		display: inline-block;
		padding: ${rhythm(0.5)};
		border-radius: 8px;
		color: #fff;
		${primaryBgColor}
	}
`

export default function NotFoundPage({ location }) {
	return (
		<Layout location={location}>
			<SEO title="404 Not Found" />
			<Wrapper>
				<h1>404</h1>
				<h2>PAGE NOT FOUND</h2>
				<p>
					Sorry, we are not able to find
					<br /> what you where looking for
				</p>
				<Link to="/">Back to home</Link>
			</Wrapper>
		</Layout>
	)
}
