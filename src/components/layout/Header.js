import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { textSecondary, inlineSpacing, alignItems } from '../../utils/styles'
import { rhythm } from '../../utils/typography'

const HeaderWrapper = styled.header`
	${alignItems}
	padding-top: ${rhythm(1.25)};
	padding-bottom: ${rhythm(1.25)};
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
				<Link to="/about">About</Link>
				<Link to="/tags">Tags</Link>
			</Nav>
		</HeaderWrapper>
	)
}

export default Header
