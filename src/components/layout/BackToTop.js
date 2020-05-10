import React, { useState, useEffect } from 'react'
import { throttle } from 'lodash'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { rhythm } from '../../utils/typography'

function BackToTop() {
	const [visible, setVisible] = useState(false)

	function onClick() {
		document.body.scrollTop = 0 // For Safari
		document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
	}

	useEffect(() => {
		const onScroll = throttle(() => {
			const scrollTop =
				document.body.scrollTop || document.documentElement.scrollTop
			if (scrollTop > 20) {
				setVisible(true)
			} else {
				setVisible(false)
			}
		}, 100)

		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<button
			css={css`
				position: fixed;
				right: ${rhythm(1)};
				bottom: ${rhythm(1)};
				z-index: 10;
				transition: opacity 0.3s, background-color 0.3s;
				width: 40px;
				height: 40px;
				font-size: 30px;
				line-height: 30px;
				color: rgba(0, 0, 0, 0.6);
				background-color: rgba(0, 0, 0, 0.2);
				border: 0;
				border-radius: 4px;
				padding: 0;
				outline: none;
				cursor: pointer;
				&:hover {
					color: rgba(0, 0, 0, 0.7);
					background-color: rgba(0, 0, 0, 0.35);
				}
			`}
			style={{
				opacity: visible ? 1 : 0,
				pointerEvents: visible ? 'auto' : 'none',
			}}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faChevronUp} />
		</button>
	)
}

export default BackToTop
