import React from 'react'
import { css } from '@emotion/core'

import { textSecondary } from '../../utils/styles'
import { rhythm } from '../../utils/typography'
import { md } from '../../utils/breakpoints'

function Footer() {
	return (
		<footer
			css={css`
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: ${rhythm(1)};
				margin-bottom: ${rhythm(1)};
				@media (min-width: ${md}) {
					margin-top: ${rhythm(1.25)};
					margin-bottom: ${rhythm(1.25)};
				}
			`}
		>
			<span css={textSecondary}>&copy; Nana</span>
		</footer>
	)
}

export default Footer
