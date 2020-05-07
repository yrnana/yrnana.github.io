import React from 'react'
import { navigate } from 'gatsby'
// import { Pagination as AntdPagination } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
`

function Pagination({ pageInfo }) {
	const { currentPage, pageCount } = pageInfo
	const [current, setCurrent] = React.useState(currentPage)

	function onChange(page) {
		setCurrent(page)
		navigate(page !== 1 ? `/pages/${page}` : '/')
	}

	return (
		<Wrapper>
			{/* <AntdPagination
				onChange={onChange}
				current={current}
				total={pageCount}
				showSizeChanger={false}
			/> */}
		</Wrapper>
	)
}

export default Pagination
