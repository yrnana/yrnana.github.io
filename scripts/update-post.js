/**
 * update-post.js
 *
 * 가장 최근 작성한 post 목록을 불러오고 선택한 post의
 * 1. 날짜 업데이트
 * 2. 제목 업데이트
 */

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const moment = require('moment')
const { take, kebabCase } = require('lodash')

const dirPath = path.resolve(__dirname, '../content/posts')
let dirs = fs
	.readdirSync(dirPath)
	.map(dirName => {
		const { mtime: dtime } = fs.statSync(path.resolve(dirPath, dirName))
		const { mtime: ftime } = fs.statSync(
			path.resolve(dirPath, dirName, 'index.mdx')
		)
		return {
			name: dirName,
			time: dtime > ftime ? dtime : ftime,
		}
	})
	.sort((a, b) => b.time - a.time)
dirs = take(dirs, 5)

if (dirs.length === 0) return

inquirer
	.prompt([
		{
			type: 'list',
			name: 'task',
			message: 'Select task',
			choices: [
				{ name: '날짜 업데이트', value: 0 },
				{ name: '제목 업데이트', value: 1 },
			],
		},
		{
			type: 'list',
			name: 'dirName',
			message: 'Select post',
			choices: dirs.map(d => d.name),
		},
		{
			type: 'input',
			name: 'slug',
			message: 'post title',
			when: ({ task }) => task === 1,
		},
	])
	.then(({ task, dirName, slug }) => {
		const filePath = path.resolve(dirPath, dirName, 'index.mdx')
		const content = fs.readFileSync(filePath, 'utf8').split('\r\n')

		if (task === 0) {
			// 날짜 업데이트
			content.map((line, i) => {
				if (line.startsWith('date: ')) {
					const date = moment().local().format('YYYY-MM-DDTHH:mm:ssZ')
					content[i] = `date: ${date}`
					return true
				}
				return false
			})
		} else {
			// 제목 업데이트
			content.map((line, i) => {
				if (line.startsWith('title: ')) {
					content[i] = `title: "${slug}"`
					return true
				}
				return false
			})
		}

		// markdown 파일 내용 교체
		content.pop()
		const newContent = content.join('\r\n') + '\r\n'
		fs.writeFileSync(filePath, newContent)

		const dirArr = dirName.split('---')
		if (task === 0) {
			// 날짜 업데이트 시 폴더명 변경
			dirArr[0] = moment().local().format('YYYY-MM-DD')
		} else {
			// 제목 업데이트 시 폴더명 변경
			dirArr[1] = kebabCase(slug)
		}

		const newDirPath = path.resolve(
			__dirname,
			'../content/posts',
			dirArr.join('---')
		)
		fs.renameSync(path.resolve(dirPath, dirName), newDirPath)
	})
	.catch(error => {
		console.error(error)
	})
