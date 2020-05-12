import React, { memo } from 'react'
import { css } from '@emotion/core'
import { DiscussionEmbed } from 'disqus-react'

import Post from './Post'
import PostNav from './PostNav'
import PageProgressBar from './PageProgressBar'
import TableOfContents, { tocParentStyles } from './TableOfContents'

import { rhythm } from '../../../utils/typography'

function PostTemplate({ post, series, previous, next }) {
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
			<div css={tocParentStyles}>
				<TableOfContents toc={post.tableOfContents} />
				<div
					css={css`
						order: 1;
						flex: 1;
					`}
				>
					<Post post={post} series={series} />
					<hr
						css={css`
							margin-top: ${rhythm(1.5)};
							margin-bottom: ${rhythm(1.5)};
							background-color: rgba(0, 0, 0, 0.1);
						`}
					/>
					<PostNav previous={previous} next={next} />
					{process.env.NODE_ENV === 'production' && (
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
					)}
				</div>
			</div>
		</>
	)
}

const areEqual = (prevProps, nextProps) =>
	process.env.NODE_ENV === 'production' &&
	prevProps.post.id === nextProps.post.id

export default memo(PostTemplate, areEqual)
