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

## Page

- / : index
- /pages/{pageNum} : page 2
- /tags : tag log
- /tags/{tagName}/pages/${pageNum}
- /{slug} : post

## To do

- [ ] remark -> mdx 고려
  - [https://www.gatsbyjs.org/docs/mdx/getting-started/](https://www.gatsbyjs.org/docs/mdx/getting-started/)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/recipes-gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/examples/recipes-gatsby-image)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-MDX](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-MDX)
- [ ] markdown 폴더명 날짜---이름으로 변경해서 Archive 구현
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark)
