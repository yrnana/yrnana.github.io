# yrnana.github.io

## Stack

- Next.js (SSG)
- Typescript
- Storybook
- TailwindCSS
- ESlint
- Prettier

## Getting Started

### 설치 및 개발환경 실행

```sh
npm install
npm run dev
```

### 스토리북 실행

```sh
npm run storybook
```

### 깃헙 배포

```sh
npm run deploy
```

## Route

- `/` : PostList
- `/page/:page` : PostList (+paging)
- `/tag/:tag` : PostList (+filtered by tag)
- `/tags` : TagList
- `/post/:slug` : Post
- `/about`
- `/archive` : PostList (Timeline)
