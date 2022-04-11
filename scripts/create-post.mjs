import { format } from 'date-fns';
import { writeFileSync } from 'fs';
import inquirer from 'inquirer';
import { kebabCase } from 'lodash-es';
import { resolve } from 'path';

const postsDir = resolve(process.cwd(), '_contents/posts/private');

/** @type {import("inquirer").QuestionCollection<any> } */
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'title',
    validate: (input) => (input ? true : '제목을 입력하세요.'),
  },
  {
    type: 'input',
    name: 'excerpt',
    message: 'excerpt',
  },
  {
    type: 'input',
    name: 'tags',
    message: 'tags (e.g. 태그1, 태그2, 태그3)',
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    const { title, excerpt, tags } = answers;
    const slug = `${format(new Date(), 'yyyy-MM-dd')}-${kebabCase(title)}`;
    const markdown = resolve(postsDir, `${slug}.md`);

    const contentArr = [
      '---',
      `title: '${title}'`,
      `date: '${format(new Date(), "yyyy-MM-dd'T'HH:mm:00+09:00")}'`,
    ];
    if (excerpt) {
      contentArr.push(`excerpt: '${excerpt}'`);
    }
    if (tags) {
      const tagStr = tags
        .split(',')
        .map((tag) => tag.trim())
        .join(', ');
      contentArr.push(`tags: [${tagStr}]`);
    }
    contentArr.push('---', '');
    writeFileSync(markdown, contentArr.join('\n'), {
      encoding: 'utf-8',
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
