import { css } from '@emotion/core'
import { rhythm } from './typography'

export const mainColor = '#7467ef'

export const spacing = css`
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	margin: -4px -4px 4px;
	& > * {
		margin: 4px !important;
		box-sizing: border-box;
	}
`

export const inlineSpacing = css`
	display: inline-flex;
	align-items: center;
	flex-wrap: wrap;
	& > * {
		margin-right: ${rhythm(1 / 1.5)};
		&:last-child {
			margin-right: 0 !important;
		}
	}
`

export const fontSizeSmall = css`
	font-size: 80%;
`

export const primaryColor = css`
	color: ${mainColor};
`

export const primaryBgColor = css`
	background-color: ${mainColor};
`

export const textPrimary = css`
	color: rgba(0, 0, 0, 0.8);
`

export const textSecondary = css`
	color: rgba(0, 0, 0, 0.5);
`

export const alignItems = css`
	display: flex;
	align-items: center;
`

export const marginTransition = css`
	transition: margin 0.3s;
`

export const paddingTransition = css`
	transition: margin 0.3s;
`

export const markdownStyles = css`
	word-wrap: break-word;
	& > {
		&:first-child {
			margin-top: 0 !important;
		}
		&:last-child {
			margin-bottom: 0 !important;
		}
	}
	a {
		&:not([href]) {
			color: inherit;
			text-decoration: none;
		}
	}
	hr {
		height: 0.25em;
		padding: 0;
		margin: ${rhythm(1)} 0;
		background-color: #e1e4e8;
		border: 0;
	}
	blockquote {
		padding: 0 1em;
		color: #6a737d;
		border-left: 0.25em solid #dfe2e5;
		margin-left: 0;
		margin-right: 0;
		& > {
			&:first-child {
				margin-top: 0;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: ${rhythm(1.5)};
		code {
			font-size: inherit;
		}
	}
	h1,
	h2 {
		padding-bottom: 0.3em;
		border-bottom: 1px solid #eaecef;
	}
	h2 {
		font-size: 1.5em;
	}
	h3 {
		font-size: 1.25em;
	}
	h4 {
		font-size: 1em;
	}
	h5 {
		font-size: 0.875em;
	}
	h6 {
		font-size: 0.85em;
		color: #6a737d;
	}
	ul,
	ol {
		margin-left: 0;
		padding-left: ${rhythm(2 / 1.5)};
		ul,
		ol {
			margin-top: 0.25em;
			margin-bottom: 0;
		}
		li {
			margin-bottom: 0;
			word-wrap: break-all;
			& > p {
				margin: 0;
			}
			& + li {
				margin-top: 0.25em;
			}
		}
	}
	dl {
		dt {
			margin-top: ${rhythm(1 / 1.5)};
			font-style: italic;
		}
		dd {
			padding: 0 ${rhythm(1 / 1.5)};
			margin-bottom: ${rhythm(1 / 1.5)};
		}
	}
	table {
		display: block;
		width: 100%;
		overflow: auto;
		th {
			font-weight: 600;
		}
		tr {
			background-color: #fff;
			border-top: 1px solid #c6cbd1;
			&:nth-of-type(2n) {
				background-color: #f6f8fa;
			}
		}
		td,
		th {
			padding: 6px 13px;
			border: 1px solid #dfe2e5;
		}
		img {
			background-color: initial;
		}
	}
	img {
		max-width: 100%;
		box-sizing: initial;
		background-color: #fff;
		&[align='right'] {
			padding-left: 20px;
		}
		&[align='left'] {
			padding-right: 20px;
		}
	}
	.footnotes {
		p:last-of-type {
			display: inline;
		}
	}
`

export const prismStyles = css`
	code[class*='language-'],
	pre[class*='language-'] {
		font-size: 14px;
		font-family: 'JetBrains Mono', 'KoPubWorld Dotum', 'Noto Sans KR', Consolas, Monaco,
			'Andale Mono', 'Ubuntu Mono', monospace;
	}
	.gatsby-highlight {
		& + .gatsby-highlight {
			margin-top: ${rhythm(1)};
		}
	}
	.gatsby-highlight-code-line {
		display: block;
		margin-right: -1em;
		margin-left: -1em;
		padding-right: 1em;
		padding-left: 0.75em;
		border-left: 0.25em solid #f99;
		background-color: #feb;
	}
	:not(pre) > code[class*='language-'] {
		font-size: inherit;
		border-radius: 0.1em;
		padding-left: 0.2em;
		padding-right: 0.2em;
	}
	.token.operator {
		background: inherit;
	}
	del {
		color: #aaa;
	}
`

export const globalStyles = css`
	${prismStyles}
	::-moz-selection {
		color: #fff;
		background-color: ${mainColor};
	}
	::selection {
		color: #fff;
		background-color: ${mainColor};
	}
	a {
		${primaryColor}
		text-decoration: none;
		transition: color 0.3s;
		&:hover {
			color: #a395fc;
		}
	}
`
