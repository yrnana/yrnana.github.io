import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import { rhythm } from '../../utils/typography'

const Container = styled.div`
	width: 100%;
	display: block;
	box-sizing: border-box;
	margin: 0 auto;
	padding-left: ${rhythm(0.75)};
	padding-right: ${rhythm(0.75)};
	@media (min-width: 992px) {
		max-width: 992px;
	}
	@media (min-width: 768px) {
		padding-left: ${rhythm(1)};
		padding-right: ${rhythm(1)};
	}
`

const Content = styled.main``

function Layout({ location, children }) {
	return (
		<Container>
			<Header pathname={location.pathname} />
			<Content>{children}</Content>
		</Container>
	)
}

export default Layout
