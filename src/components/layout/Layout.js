import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import Header from './Header'
import Footer from './Footer'

import { rhythm } from '../../utils/typography'
import { md, lg } from '../../utils/breakpoints'
import { paddingTransition, prismStyles } from '../../utils/styles'
import BackToTop from './BackToTop'

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
			<Global
				styles={css`
					${prismStyles}
					::-moz-selection {
						background-color: #7467ef;
					}
					::selection {
						background-color: #7467ef;
					}
					h6::selection,
					blockquote p::selection,
					a::selection {
						color: #fff;
					}
				`}
			/>
			<BackToTop />
			<Header />
			<main>{children}</main>
			<Footer />
		</Container>
	)
}

export default Layout
