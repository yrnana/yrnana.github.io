import React, { useEffect } from 'react'
import styled from '@emotion/styled'

import { rhythm } from '../../../utils/typography'
import { textSecondary } from '../../../utils/styles'

const Toc = styled.div`
	order: 2;
	position: sticky;
	top: ${rhythm(1.25)};
	padding-left: ${rhythm(1)};
	font-size: 80%;
	& > ul {
		margin-left: 0;
		margin-bottom: 0;
	}
	ul {
		list-style: none;
	}
	li {
		margin-bottom: ${rhythm(0.25)};
		*:last-child {
			margin-bottom: 0;
		}
		& > ul {
			margin-left: ${rhythm(0.25)};
			margin-top: ${rhythm(0.25)};
		}
	}
	a {
		${textSecondary}
	}
`

function List({ items }) {
	return (
		<ul>
			{items.map(item => (
				<li key={item.title}>
					<a href={item.url}>{item.title}</a>
					{item.items && <List items={item.items} />}
				</li>
			))}
		</ul>
	)
}

function TableOfContents({ toc, tocStyles }) {
	useEffect(() => {
		let hash = window.location.hash
		if (hash) {
			const el = document.getElementById(hash.slice(1))
			const top = el.getBoundingClientRect().top + document.body.scrollTop
			document.body.scrollTop = top
			document.documentElement.scrollTop = top
		}
	}, [])

	const { items } = toc

	return (
		<Toc css={tocStyles}>
			{items && (
				<>
					<h4>Table Of Contents</h4>
					<List items={items} />
				</>
			)}
		</Toc>
	)
}

export default TableOfContents

// https://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
// http://jsfiddle.net/mekwall/up4nu/
// scroll hash link active
