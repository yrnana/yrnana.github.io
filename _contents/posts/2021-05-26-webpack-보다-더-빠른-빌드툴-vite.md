---
title: 'Webpack 보다 더 빠른 빌드툴, Vite'
date: '2021-05-26T21:45:47+09:00'
excerpt: '이런 제목을 어디서 본 것 같은데? 라고 생각한다면 정상이다.'
tags: [esbuild, Vite]
published: true
---

이런 제목을 어디서 본 것 같은데?
라고 생각한다면 정상이다.

> [https://yrnana.dev/post/2021-02-11-webpack-snowpack](/post/2021-02-11-webpack-snowpack)  
> Webpack 보다 더 빠른 빌드툴, Snowpack

`Vite`는 `Snowpack`과 아주 유사한 컨셉의 프론트엔드 빌드툴이다.
`Vue.js`의 창시자로 유명한 Evan You가 개발했고 이름값을 하는 것 같다. `SvelteKit`도 `Snowpack`을 손절하고 `Vite`로 갈아탄 듯 하다 (웃픈...)

`SvelteKit`에서 설명하는 `Vite`의 비교장점은 `Snowpack`보다 `SSR`을 더 잘 지원한다는 점이다.
내가 느낀 장점은 `Snowpack`은 chrome devtools에 tsc와 esbuild로 이미 빌드가 된 상태의 js 파일을 보여줘서 source탭을 무용지물로 만드는 반면 `Vite`는 소스맵을 잘 지원한다는 점이다.

그러니까 사이드 프로젝트에는 `Vite` 쓰자.
https://vitejs.dev/
