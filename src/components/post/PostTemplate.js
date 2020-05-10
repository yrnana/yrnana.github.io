import React from 'react'
import { css } from '@emotion/core'
import { DiscussionEmbed } from 'disqus-react'

import Post from './Post'
import PostNav from './PostNav'

import { rhythm } from '../../utils/typography'

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
		</>
	)
}

export default PostTemplate
