/**
 * create-post.js
 *
 * post 생성
 */

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const moment = require('moment')
const { kebabCase } = require('lodash')
const { exec } = require('child_process')

inquirer
	.prompt([
		{
			type: 'input',
			name: 'slug',
			message: 'post title',
		},
	])
	.then(({ slug }) => {
		const date = moment().local()
		const dirName = `${date.format('YYYY-MM-DD')}---${kebabCase(slug)}`
		const dirPath = path.resolve(__dirname, '../content/posts', dirName)

		if (fs.existsSync(dirPath)) throw new Error('이미 폴더명이 존재합니다.')

		// 폴더 생성
		fs.mkdirSync(dirPath)

		// 컨텐츠 정의
		const content =
			[
				'---',
				`title: ${slug}`,
				`date: ${date.format('YYYY-MM-DDTHH:mm:ssZ')}`,
				'description: ',
				'tags: []',
				'image: ',
				'series: ',
				'---',
			].join('\r\n') + '\r\n'

		// markdown 파일 생성
		const mdxPath = path.resolve(dirPath, 'index.mdx')
		fs.appendFileSync(mdxPath, content)

		// 파일 열기
		exec(`code ${dirPath}/index.mdx`)
	})
	.catch(error => {
		console.error(error)
	})
