import React from 'react'
import { kebabCase, isEmpty } from 'lodash'
import styled from '@emotion/styled'

import Tag from '../tag/Tag'

import { inlineSpacing } from '../../utils/styles'
import { rhythm } from '../../utils/typography'

const Wrapper = styled.div`
	margin-top: ${props => (props.isList ? 0 : rhythm(1.5))};
	${inlineSpacing}
	& > * {
		margin-right: 8px;
	}
`

function TagList({ tags, isList }) {
	if (isEmpty(tags)) {
		return null
	}

	return (
		<>
			{isList && <small>-</small>}
			<Wrapper isList={!!isList}>
				{tags.map(tag => (
					<Tag
						key={tag}
						to={`/tags/${kebabCase(tag)}/pages/1`}
						label={tag}
					/>
				))}
			</Wrapper>
		</>
	)
}

export default TagList
