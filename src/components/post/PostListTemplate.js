import React from 'react'
import PostList from './PostList'
import Pagination from './Pagination'

function PostListTemplate({ posts, pageInfo }) {
	return (
		<>
			<PostList posts={posts} />
			<Pagination pageInfo={pageInfo} />
		</>
	)
}

export default PostListTemplate
