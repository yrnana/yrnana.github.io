import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const FlexBox = styled.header`
	display: flex;
	align-items: center;
	padding-top: 1.75rem;
	padding-bottom: 1.75rem;
`

const Title = styled.h2`
	font-size: 1.4rem !important;
	margin-bottom: 0 !important;
`

const Nav = styled.nav`
	margin-left: auto;
	display: inline-flex;
	align-items: center;
	a {
		color: rgba(0, 0, 0, 0.45);
		margin-right: 16px;
		&:last-child {
			margin-right: 0;
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
		<FlexBox>
			<Title level={2}>
				<Link to="/">{title}</Link>
			</Title>
			<Nav>
				<Link to="/about">About</Link>
				<Link to="/tags">Tags</Link>
			</Nav>
		</FlexBox>
	)
}

export default Header
