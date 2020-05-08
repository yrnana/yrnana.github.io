---
title: README.md
date: 2020-05-08 13:29:00
description: 
tags: []
---

## vscode setting

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.markdownlint": true
  }
}
```

## Extension

- markdownlint
- markdown all in one
- markdown preview github styling

## Page

- / : index
- /pages/{pageNum} : page 2
- /tags : tag log
- /tags/{tagName}/pages/${pageNum}
- /posts/{slug} : post

## To do

- [ ] remark -> mdx
  - [https://www.gatsbyjs.org/docs/mdx/getting-started/](https://www.gatsbyjs.org/docs/mdx/getting-started/)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/recipes-gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/examples/recipes-gatsby-image)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-MDX](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-MDX)
  - [https://github.com/remarkjs/remark/blob/master/doc/plugins.md](https://github.com/remarkjs/remark/blob/master/doc/plugins.md)
  - [https://www.gatsbyjs.org/docs/mdx/plugins/](https://www.gatsbyjs.org/docs/mdx/plugins/)
- [ ] markdown 폴더명 날짜---이름으로 변경해서 Archive 구현
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark)
- [ ] index.js 지우고 node.js - createPage에서 따로 생성
- [ ] emotion & prism.js 참고
