import React from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'

import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'

import { rhythm } from '../../utils/typography'
import { md, lg } from '../../utils/breakpoints'
import { paddingTransition, globalStyles } from '../../utils/styles'

const Container = styled.div`
	width: 100%;
	display: block;
	box-sizing: border-box;
	margin: 0 auto;
	padding-left: ${rhythm(1)};
	padding-right: ${rhythm(1)};
	${paddingTransition}
	@media (min-width: ${lg}) {
		max-width: ${lg};
	}
	@media (min-width: ${md}) {
		padding-left: ${rhythm(1.25)};
		padding-right: ${rhythm(1.25)};
	}
`

function Layout({ children }) {
	return (
		<Container>
			<Global styles={globalStyles} />
			<BackToTop />
			<Header />
			<main>{children}</main>
			<Footer />
		</Container>
	)
}

export default Layout
