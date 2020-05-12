import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { findLast, throttle, isEmpty } from 'lodash'

import { rhythm } from '../../../utils/typography'
import { textSecondary, primaryColor } from '../../../utils/styles'

const tocWidth = `200px`
const tocBreakpoint = '@media (max-width: 1400px)'

export const tocParentStyles = css`
	display: flex;
	align-items: flex-start;
	margin-right: -${tocWidth};
	${tocBreakpoint} {
		display: block;
		margin-right: 0;
	}
`

const Toc = styled.div`
	width: ${tocWidth};
	max-width: ${tocWidth};
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
	${tocBreakpoint} {
		display: none;
	}
`

const linkStyles = css`
	${textSecondary}
	&.active {
		${primaryColor}
	}
`

function List({ items, active }) {
	return (
		<ul>
			{items.map(item => (
				<li key={item.title}>
					<a
						href={item.url}
						className={active === item.url ? 'active' : null}
						css={linkStyles}
					>
						{item.title}
					</a>
					{item.items && <List items={item.items} active={active} />}
				</li>
			))}
		</ul>
	)
}

function TableOfContents({ toc }) {
	const { items } = toc
	const [active, setActive] = useState(null)

	const itemIds = useMemo(() => {
		if (isEmpty(items)) {
			return []
		}

		const res = []
		const recur = x => {
			x.forEach(({ url, title, items: children }) => {
				res.push(url.slice(1))
				if (children && children.length > 0) recur(children)
			})
		}
		recur(items)
		return res
	}, [items])

	useEffect(() => {
		// 첫 접속시 해시가 존재할때 위치 조정
		let hash = window.location.hash
		if (hash) {
			const el = document.getElementById(hash.slice(1))
			if (!el) return

			const top = el.getBoundingClientRect().top + document.body.scrollTop
			document.body.scrollTop = top
			document.documentElement.scrollTop = top
		}
	}, [])

	// 스크롤 시 위치 조정
	const handleActive = useCallback(() => {
		const scrollTop =
			document.body.scrollTop || document.documentElement.scrollTop
		const curr = findLast(itemIds, id => {
			const el = document.getElementById(id)
			const rect = el.getBoundingClientRect()
			const offsetTop = rect.top + scrollTop
			return offsetTop - 1 < scrollTop
		})
		setActive(curr ? `#${curr}` : null)
	}, [itemIds])

	useEffect(() => {
		const onScroll = throttle(handleActive, 200)
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [handleActive])

	return (
		<Toc>
			{items && (
				<>
					<h4>Table Of Contents</h4>
					<List items={items} active={active} />
				</>
			)}
		</Toc>
	)
}

export default TableOfContents
