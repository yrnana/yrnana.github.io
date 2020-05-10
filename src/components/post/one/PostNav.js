import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { rhythm } from '../../../utils/typography'
import { textSecondary } from '../../../utils/styles'

const NavLink = styled(Link)`
	small {
		display: block;
		padding-bottom: ${rhythm(0.25)};
		text-align: ${props => (props.rel === 'next' ? 'right' : 'left')};
		${textSecondary}
	}
	&:hover {
		small {
			color: rgba(0, 0, 0, 0.4);
		}
	}
	div {
		display: inline-flex;
		align-items: center;
		svg {
			margin-left: ${props => (props.rel === 'next' ? rhythm(0.5) : 0)};
			margin-right: ${props => (props.rel === 'next' ? 0 : rhythm(0.5))};
		}
	}
`

function PostNav({ previous, next }) {
	return (
		<nav>
			<ul
				css={css`
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					list-style: none;
					padding: 0;
					margin: 0;
					li {
						margin: 0;
					}
				`}
			>
				<li>
					{previous && (
						<NavLink to={previous.fields.slug} rel="prev">
							<small>Previous</small>
							<div>
								<FontAwesomeIcon icon={faArrowLeft} />
								<span>{previous.frontmatter.title}</span>
							</div>
						</NavLink>
					)}
				</li>
				<li>
					{next && (
						<NavLink to={next.fields.slug} rel="next">
							<small>Next</small>
							<div>
								<span>{next.frontmatter.title}</span>
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
						</NavLink>
					)}
				</li>
			</ul>
		</nav>
	)
}

export default PostNav
