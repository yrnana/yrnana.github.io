import React from 'react'
import styled from 'styled-components'
import Header from './Header'

const Container = styled.div`
	width: 100%;
	display: block;
	box-sizing: border-box;
	margin: 0 auto;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
	@media (min-width: 992px) {
		max-width: 992px;
	}
	@media (min-width: 768px) {
		padding-left: 1.75rem;
		padding-right: 1.75rem;
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
