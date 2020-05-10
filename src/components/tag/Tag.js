import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

const COLOR_TYPES = {
	default: {
		color: 'rgba(0, 0, 0, 0.65)',
		background: '#fafafa',
		border: '#d9d9d9',
	},
	purple: {
		color: '#722ed1',
		background: '#f9f0ff',
		border: '#d3adf7',
	},
	blue: {
		color: '#1890ff',
		background: '#e6f7ff',
		border: '#91d5ff',
	},
	green: {
		color: '#52c41a',
		background: '#f6ffed',
		border: '#b7eb8f',
	},
	orange: {
		color: '#fa8c16',
		background: '#fff7e6',
		border: '#ffd591',
	},
	magenta: {
		color: '#eb2f96',
		background: '#fff0f6',
		border: '#ffadd2',
	},
}

function Tag({ to, label, type = 'default' }) {
	const { color, background, border } = COLOR_TYPES[type]

	return (
		<Link
			to={to}
			css={css`
				color: ${color};
				background: ${background};
				border: 1px solid ${border};
				border-radius: 2px;
				box-sizing: border-box;
				font-variant: tabular-nums;
				list-style: none;
				font-feature-settings: 'tnum';
				display: inline-block;
				vertical-align: middle;
				height: auto;
				padding: 0 7px;
				font-size: 12px;
				line-height: 20px;
				white-space: nowrap;
				opacity: 1;
				transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
				&:hover {
					color: ${color};
					opacity: 0.85;
				}
			`}
		>
			{label}
		</Link>
	)
}

export default Tag
