import Typography from 'typography'
/*
import githubTheme from 'typography-theme-github'

// https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-github/src/index.js
githubTheme.baseLineHeight = 1.5
githubTheme.headerLineHeight = 1.25
githubTheme.bodyFontFamily = ['Noto Sans KR', 'sans-serif']
githubTheme.headerFontFamily = ['Noto Sans KR', 'sans-serif']
githubTheme.blockMarginBottom = 1 / 1.5
githubTheme.overrideThemeStyles = () => {
	return {
		a: {
			color: '#7467ef',
		},
		h1: {
			marginTop: '24px',
			marginBottom: '16px',
			paddingBottom: '.3em',
			fontWeight: 600,
		},
		h2: {
			marginTop: '24px',
			marginBottom: '16px',
			paddingBottom: '.3em',
			fontWeight: 600,
		},
		h3: {
			marginTop: '24px',
			marginBottom: '16px',
			fontWeight: 600,
		},
		h4: {
			marginTop: '24px',
			marginBottom: '16px',
			fontWeight: 600,
		},
		h5: {
			marginTop: '24px',
			marginBottom: '16px',
			fontWeight: 600,
		},
		h6: {
			marginTop: '24px',
			marginBottom: '16px',
			fontWeight: 600,
		},
		'h3,h4,h5,h6': {
			marginTop: '24px',
			marginBottom: '16px',
		},
		blockquote: {
			borderLeft: '.25em solid #dfe2e5',
			color: '#6a737d',
			paddingLeft: '1rem',
			paddingRight: '1rem',
		},
	}
}

const typography = new Typography(githubTheme)
console.log(typography)
console.log(typography.toJSON())
*/

const typography = new Typography({
	bodyFontFamily: ['Noto Sans KR', 'sans-serif'],
	headerFontFamily: ['Noto Sans KR', 'sans-serif'],
	baseLineHeight: 1.5,
	headerLineHeight: 1.25,
	blockMarginBottom: 1 / 1.5,
})

export default typography
