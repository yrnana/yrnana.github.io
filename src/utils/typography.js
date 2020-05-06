import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => {
	return {
		h1: {
			'font-family': "'Noto Sans KR', sans-serif",
		},
		a: {
			boxShadow: `none`,
		},
		blockquote: {
			'font-size': 'inherit',
			'line-height': 'inherit',
		},
		// 'a.gatsby-resp-image-link': {
		// 	boxShadow: `none`,
		// },
	}
}

delete Wordpress2016.googleFonts

const typography = new Typography({
	...Wordpress2016,
	headerFontFamily: ['Noto Sans KR', 'sans-serif'],
	bodyFontFamily: ['Noto Sans KR', 'sans-serif'],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
	typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
