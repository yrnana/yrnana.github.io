import React from 'react'
import Post from './Post'
import PostNav from './PostNav'

function PostTemplate({ post, previous, next }) {
	return (
		<>
			<Post post={post} />
			<PostNav previous={previous} next={next} />
		</>
	)
}

export default PostTemplate
