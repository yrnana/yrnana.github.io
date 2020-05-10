## vscode setting

```
{
  // eslint
  "eslint.enable": true,
  "eslint.format.enable": true,
  "eslint.alwaysShowStatus": true,
  // prettier
  "prettier.disableLanguages": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "mdx",
    "markdown"
  ],
  // format
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.markdownlint": true,
    // "source.fixAll.stylelint": true,
    // "source.fixAll.tslint": true,
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // markdown
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },
  "files.associations": {
    "*.mdx": "markdown"
  },
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
- /tags/{tagName}/pages/\${pageNum}
- /posts/{slug} : post

## To do

- [x] remark -> mdx
  - [https://www.gatsbyjs.org/docs/mdx/getting-started/](https://www.gatsbyjs.org/docs/mdx/getting-started/)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/recipes-gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/examples/recipes-gatsby-image)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n)
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-MDX](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-MDX)
  - [https://github.com/remarkjs/remark/blob/master/doc/plugins.md](https://github.com/remarkjs/remark/blob/master/doc/plugins.md)
  - [https://www.gatsbyjs.org/docs/mdx/plugins/](https://www.gatsbyjs.org/docs/mdx/plugins/)
- [x] index.js 지우고 node.js - createPage에서 따로 생성
- [x] emotion & prism.js 참고
- [x] PostNav 디자인
- [x] 본문 태그
- [x] Disqus 댓글
- [x] markdown 폴더명 날짜---이름으로 변경해서 Archive 구현
  - [https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark)
- [x] progress bar
- [x] go to top
- [x] create-post.js 작성
- [x] update-post.js 작성 (가장 최근 작성한 문서들 불러와서 선택시 date값 update)
- [x] 404 page
- [ ] h1 link : tableOfContents
- [ ] 관련글 기능
- [ ] 상단 메뉴 media screen icon으로 변경 (font awesome?)
- [ ] 검색 기능
- [ ] about.js
