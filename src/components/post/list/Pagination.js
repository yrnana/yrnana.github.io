import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { rhythm } from '../../../utils/typography'
import { textPrimary, primaryColor } from '../../../utils/styles'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
	let i = from
	const range = []

	while (i <= to) {
		range.push(i)
		i += step
	}

	return range
}

/**
 * Let's say we have 10 pages and we set pageNeighbours to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (1) < {4 5} [6] {7 8} > (10)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 */
const getPages = (currentPage, pageCount, pageNeighbours) => {
	const totalNumbers = pageNeighbours * 2 + 3
	const totalBlocks = totalNumbers + 2

	if (pageCount > totalBlocks) {
		const startPage = Math.max(2, currentPage - pageNeighbours)
		const endPage = Math.min(pageCount - 1, currentPage + pageNeighbours)

		let pages = range(startPage, endPage)

		/**
		 * hasLeftSpill: has hidden pages to the left
		 * hasRightSpill: has hidden pages to the right
		 * spillOffset: number of hidden pages either to the left or to the right
		 */
		const hasLeftSpill = startPage > 2
		const hasRightSpill = pageCount - endPage > 1
		const spillOffset = totalNumbers - (pages.length + 1)

		switch (true) {
			// handle: (1) < {5 6} [7] {8 9} (10)
			case hasLeftSpill && !hasRightSpill: {
				const extraPages = range(startPage - spillOffset, startPage - 1)
				pages = [LEFT_PAGE, ...extraPages, ...pages]
				break
			}

			// handle: (1) {2 3} [4] {5 6} > (10)
			case !hasLeftSpill && hasRightSpill: {
				const extraPages = range(endPage + 1, endPage + spillOffset)
				pages = [...pages, ...extraPages, RIGHT_PAGE]
				break
			}

			// handle: (1) < {4 5} [6] {7 8} > (10)
			case hasLeftSpill && hasRightSpill:
			default: {
				pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
				break
			}
		}

		return [1, ...pages, pageCount]
	}

	return range(1, pageCount)
}

const Wrapper = styled.nav`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: ${rhythm(1)};
	margin-bottom: ${rhythm(1)};
`

const PaginationList = styled.ul`
	display: inline-flex;
	flex-wrap: wrap;
	align-items: center;
	list-style: none;
	margin-bottom: 0;
`

const PaginationItem = styled.li`
	margin-bottom: 0;
	a {
		display: block;
		min-width: 32px;
		font-size: 14px;
		height: 32px;
		line-height: 32px;
		margin: 0 3px;
		padding: 0 6px;
		box-sizing: border-box;
		border-radius: 4px;
		text-align: center;
		background-color: ${props =>
			props.current ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};
		pointer-events: ${props => (props.current ? 'none' : 'auto')};
		&:hover {
			color: inherit;
			background-color: rgba(0, 0, 0, 0.04);
		}
	}
`

const getUrl = (baseUrl, page) => {
	if (!baseUrl) {
		if (page === 1) {
			return '/'
		} else {
			return `/pages/${page}`
		}
	} else {
		return `${baseUrl}/pages/${page}`
	}
}

function Pagination({ pageInfo }) {
	const { currentPage, pageCount, baseUrl = '' } = pageInfo
	const pageNeighbours = 1

	const pages = getPages(currentPage, pageCount, pageNeighbours)

	const left = getUrl(baseUrl, currentPage - pageNeighbours * 2 - 1)
	const right = getUrl(baseUrl, currentPage + pageNeighbours * 2 + 1)

	return (
		<Wrapper>
			<PaginationList>
				{pages.map((page, index) => {
					if (page === LEFT_PAGE)
						return (
							<PaginationItem key={index}>
								<Link
									to={left}
									css={textPrimary}
									aria-label="Previous"
								>
									&laquo;
								</Link>
							</PaginationItem>
						)

					if (page === RIGHT_PAGE)
						return (
							<PaginationItem key={index}>
								<Link
									to={right}
									css={textPrimary}
									aria-label="Next"
								>
									&raquo;
								</Link>
							</PaginationItem>
						)

					return (
						<PaginationItem
							key={index}
							current={currentPage === page}
						>
							<Link
								to={getUrl(baseUrl, page)}
								css={
									currentPage === page
										? primaryColor
										: textPrimary
								}
							>
								{page}
							</Link>
						</PaginationItem>
					)
				})}
			</PaginationList>
		</Wrapper>
	)
}

export default Pagination
