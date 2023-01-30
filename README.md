# yrnana.dev

## Stack

- Astro
- TypeScript
- TailwindCSS
- ESlint
- Prettier

## Getting Started

### 설치 및 개발환경 실행

```sh
yarn install --immutable --immutable-cache
```

## Route

- `/` : PostList
- `/page/:page` : PostList (+paging)
- `/tag/:tag` : PostList (+filtered by tag)
- `/tags` : TagList
- `/post/:slug` : Post
- `/about`
- `/archive` : PostList (Timeline)

## TODO

- [ ] sitemap
- [ ] 인라인 태그
- [ ] manifest
- [ ] excerpt 뽑아내기
