import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import ArchiveItem from './ArchiveItem'

import { marginTransition } from '../../utils/styles'
import { md } from '../../utils/breakpoints'
import { rhythm } from '../../utils/typography'

const Title = styled.h1`
	text-align: center;
	font-weight: 900;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(2.25)};
	${marginTransition}
	@media (min-width: ${md}) {
		margin-bottom: ${rhythm(2.5)};
	}
`

function Archive({ archives }) {
	return (
		<>
			<Title>Archive</Title>
			<div
				css={css`
					section {
						margin-bottom: ${rhythm(2)};
					}
					ul {
						margin: 0;
						list-style: none;
					}
				`}
			>
				{archives.map(archive => (
					<section key={archive.fieldValue}>
						<h2>{archive.fieldValue}</h2>
						<ul>
							{archive.edges.map(({ node }) => (
								<ArchiveItem key={node.id} node={node} />
							))}
						</ul>
					</section>
				))}
			</div>
		</>
	)
}

export default Archive
