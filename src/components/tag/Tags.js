import React from 'react'
import { kebabCase } from 'lodash'
import styled from '@emotion/styled'

import Tag from './Tag'

import { spacing, marginTransition } from '../../utils/styles'
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

function Tags({ tags }) {
	function getColor(count) {
		if (count < 10) return 'purple'
		else if (count < 30) return 'blue'
		else if (count < 50) return 'green'
		else if (count < 100) return 'orange'
		else return 'magenta'
	}

	return (
		<>
			<Title>Tags</Title>
			<div css={spacing}>
				{tags.map(tag => (
					<Tag
						key={tag.fieldValue}
						type={getColor(tag.totalCount)}
						to={`/tags/${kebabCase(tag.fieldValue)}/pages/1`}
						label={`${tag.fieldValue} (${tag.totalCount})`}
					/>
				))}
			</div>
		</>
	)
}

export default Tags
