import React, { memo } from 'react'
import { css } from '@emotion/core'
import { DiscussionEmbed } from 'disqus-react'

import Post from './Post'
import PostNav from './PostNav'
import PageProgressBar from './PageProgressBar'
import TableOfContents from './TableOfContents'

import { rhythm } from '../../../utils/typography'

const tocWidth = `200px`
const tocBreakpoint = '@media (max-width: 1400px)'
const tocStyles = css`
	width: ${tocWidth};
	max-width: ${tocWidth};
	${tocBreakpoint} {
		display: none;
	}
`
const postWrapperStyles = css`
	display: flex;
	align-items: flex-start;
	margin-right: -${tocWidth};
	${tocBreakpoint} {
		margin-right: 0;
	}
`

function PostTemplate({ post, previous, next }) {
	const disqusConfig = {
		shortname: process.env.GATSBY_DISQUS_NAME,
		config: {
			identifier: post.fields.slug,
			title: post.frontmatter.title,
		},
	}

	return (
		<>
			<PageProgressBar />
			<div css={postWrapperStyles}>
				<TableOfContents
					toc={post.tableOfContents}
					tocStyles={tocStyles}
				/>
				<div
					css={css`
						order: 1;
						flex: 1;
					`}
				>
					<Post post={post} />
					<hr
						css={css`
							margin-top: ${rhythm(1.5)};
							margin-bottom: ${rhythm(1.5)};
							background-color: rgba(0, 0, 0, 0.1);
						`}
					/>
					<PostNav previous={previous} next={next} />
					<div
						css={css`
							margin-top: ${rhythm(1.5)};
							iframe {
								margin-bottom: 0;
							}
						`}
					>
						<DiscussionEmbed {...disqusConfig} />
					</div>
				</div>
			</div>
		</>
	)
}

const areEqual = (prevProps, nextProps) =>
	prevProps.post.id === nextProps.post.id

export default memo(PostTemplate, areEqual)
