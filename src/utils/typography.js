import Typography from 'typography'

const typography = new Typography({
	bodyFontFamily: ['Noto Sans KR', 'sans-serif'],
	headerFontFamily: ['Noto Sans KR', 'sans-serif'],
	baseLineHeight: 1.5,
	headerLineHeight: 1.25,
	blockMarginBottom: 1 / 1.5,
	bodyWeight: 400,
	boldWeight: 700,
	headerWeight: 700,
	bodyColor: 'rgba(0, 0, 0, 0.8)',
	headerColor: 'inherit',
})

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
