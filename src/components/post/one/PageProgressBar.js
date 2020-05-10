import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { throttle } from 'lodash'

import { primaryBgColor } from '../../../utils/styles'

function PageProgressBar() {
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const onScroll = throttle(() => {
			const scrollTop =
				document.body.scrollTop || document.documentElement.scrollTop
			const height =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight
			const scrolled = (scrollTop / height) * 100
			setWidth(scrolled)
		}, 100)

		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<div
			css={css`
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 1;
			`}
		>
			<div
				css={css`
					width: 0%;
					height: 3px;
					transition: width 0.1s;
					${primaryBgColor}
				`}
				style={{ width: `${width}%` }}
			></div>
		</div>
	)
}

export default PageProgressBar
