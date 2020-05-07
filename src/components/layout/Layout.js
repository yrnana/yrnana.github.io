import React from 'react'
import styled from '@emotion/styled'
import Header from './Header'
import { rhythm } from '../../utils/typography'
import { md, lg } from '../../utils/breakpoints'

const Container = styled.div`
	width: 100%;
	display: block;
	box-sizing: border-box;
	margin: 0 auto;
	padding-left: ${rhythm(1)};
	padding-right: ${rhythm(1)};
	@media (min-width: ${lg}) {
		max-width: ${lg};
	}
	@media (min-width: ${md}) {
		padding-left: ${rhythm(1.25)};
		padding-right: ${rhythm(1.25)};
	}
`

function Layout({ location, children }) {
	return (
		<Container>
			<Header pathname={location.pathname} />
			<main>{children}</main>
		</Container>
	)
}

export default Layout
