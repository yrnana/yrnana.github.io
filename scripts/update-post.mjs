import { format } from 'date-fns';
import { readFileSync, renameSync, writeFileSync } from 'fs';
import glob from 'glob';
import inquirer from 'inquirer';
import { kebabCase } from 'lodash-es';
import { resolve } from 'path';

const postsDir = resolve(process.cwd(), '_contents/posts');
const markdowns = glob.sync('**/*.md', {
  cwd: postsDir,
});

inquirer
  .prompt([
    {
      type: 'list',
      name: 'fileName',
      message: '수정할 파일을 선택하세요',
      choices: markdowns,
      loop: false,
    },
    {
      type: 'list',
      name: 'field',
      message: '수정할 값을 선택하세요',
      choices: ['title', 'date'],
    },
  ])
  .then(({ fileName, field }) => {
    const markdown = resolve(postsDir, fileName);
    const content = readFileSync(markdown, {
      encoding: 'utf-8',
    });
    const contentArr = content.split('\n');

    if (field === 'title') {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'title',
            validate: (input) => (input ? true : '제목을 입력하세요.'),
          },
        ])
        .then(({ title }) => {
          // 파일 내부 title 교체
          const titleIdx = contentArr.findIndex((line) =>
            line.startsWith('title: '),
          );
          contentArr.splice(titleIdx, 1, `title: '${title}'`);
          writeFileSync(markdown, contentArr.join('\n'), {
            encoding: 'utf-8',
          });

          // 파일 이름 변경
          const newFileName = fileName.replace(
            /(.*\/\d{4}-\d{2}-\d{2}-)(.*)(\.md)/,
            `$1${kebabCase(title)}$3`,
          );
          renameSync(markdown, resolve(postsDir, newFileName));
        });
    } else {
      // 파일 내부 date 교체
      const dateIdx = contentArr.findIndex((line) => line.startsWith('date: '));
      contentArr.splice(
        dateIdx,
        1,
        `date: '${format(new Date(), "yyyy-MM-dd'T'HH:mm:00+09:00")}'`,
      );
      writeFileSync(markdown, contentArr.join('\n'), {
        encoding: 'utf-8',
      });

      // 파일 이름 변경
      const newFileName = fileName.replace(
        /(.*\/)(\d{4}-\d{2}-\d{2})(-.*\.md)/,
        `$1${format(new Date(), 'yyyy-MM-dd')}$3`,
      );
      renameSync(markdown, resolve(postsDir, newFileName));
    }
  });
