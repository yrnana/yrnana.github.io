import React from 'react'
import styled from '@emotion/styled'

import Layout from '../components/layout/Layout'
import SEO from '../components/layout/seo'

import { marginTransition } from '../utils/styles'
import { rhythm } from '../utils/typography'
import { md } from '../utils/breakpoints'

const Title = styled.h1`
	text-align: center;
	font-weight: 900;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(2.25)};
	${marginTransition}
	@media (min-width: ${md}) {
		margin-bottom: ${rhythm(2.5)};
	}
`

export default function AboutTemplate({ children }) {
	return (
		<Layout>
			<SEO title="About" description="About Page" />
			<Title>About</Title>
			{children}
		</Layout>
	)
}
