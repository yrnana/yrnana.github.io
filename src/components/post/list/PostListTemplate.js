import React, { memo } from 'react'

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

const areEqual = (prevProps, nextProps) =>
	prevProps.pageInfo.baseUrl === nextProps.pageInfo.baseUrl &&
	prevProps.pageInfo.currentPage === nextProps.pageInfo.currentPage

export default memo(PostListTemplate, areEqual)
