import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'

import {
	primaryColor,
	textSecondary,
	inlineSpacing,
	alignItems,
	paddingTransition,
} from '../../utils/styles'
import { md } from '../../utils/breakpoints'
import { rhythm } from '../../utils/typography'

const HeaderWrapper = styled.header`
	${alignItems}
	${paddingTransition}
	padding-top: ${rhythm(1)};
	padding-bottom: ${rhythm(1)};
	@media (min-width: ${md}) {
		padding-top: ${rhythm(1.25)};
		padding-bottom: ${rhythm(1.25)};
	}
`

const Title = styled.h2`
	font-size: ${rhythm(1)};
	margin-bottom: 0;
`

const Nav = styled.nav`
	margin-left: auto;
	${inlineSpacing}
	a {
		${textSecondary}
		&.active {
			${primaryColor}
			pointer-events: none;
			cursor: pointer;
		}
	}
`

function Header() {
	const { site } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	const title = site.siteMetadata.title

	return (
		<HeaderWrapper>
			<Title>
				<Link to="/">{title}</Link>
			</Title>
			<Nav>
				<Link to="/about" activeClassName="active">
					About
				</Link>
				<Link to="/archive" activeClassName="active">
					Archive
				</Link>
				<Link to="/tags" activeClassName="active">
					Tags
				</Link>
			</Nav>
		</HeaderWrapper>
	)
}

export default Header
