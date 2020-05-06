import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { Typography, Space } from 'antd'
import { rhythm } from '../../utils/typography'

const FlexBox = styled.header`
	display: flex;
	align-items: center;
	padding-top: ${rhythm(1)};
	padding-bottom: ${rhythm(1)};
`

const Title = styled(Typography.Title)`
	font-size: 1.4rem !important;
	margin-bottom: 0 !important;
`

const Nav = styled.nav`
	margin-left: auto;
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
				<Space size="middle" align="center">
					<Link to="/about">
						<Typography.Text type="secondary">
							About
						</Typography.Text>
					</Link>
					<Link to="/tags">
						<Typography.Text type="secondary">Tags</Typography.Text>
					</Link>
				</Space>
			</Nav>
		</FlexBox>
	)
}

export default Header
