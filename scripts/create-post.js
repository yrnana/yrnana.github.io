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

inquirer
	.prompt([
		{
			type: 'input',
			name: 'slug',
			message: 'slug (in english)',
			validate: function (value) {
				if (!value || !/^[a-z0-9 ]+$/i.test(value))
					return '유효한 slug 값이 아닙니다.'
				return true
			},
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
				'title: ',
				`date: ${date.format('YYYY-MM-DDTHH:mm:ssZ')}`,
				'description: ',
				'tags: []',
				'---',
			].join('\r\n') + '\r\n'

		// markdown 파일 생성
		const mdxPath = path.resolve(dirPath, 'index.mdx')
		fs.appendFileSync(mdxPath, content)
	})
	.catch(error => {
		console.error(error)
	})
