---
title: 'Webpack 보다 더 빠른 빌드툴, Vite'
date: '2021-05-26T21:45:47+09:00'
excerpt: '이런 제목을 어디서 본 것 같은데? 라고 생각한다면 정상이다.'
tags: [esbuild, Vite]
---

이런 제목을 어디서 본 것 같은데?
라고 생각한다면 정상이다.

> [https://yrnana.dev/post/2021-02-11-webpack-snowpack](/post/2021-02-11-webpack-snowpack)  
> Webpack 보다 더 빠른 빌드툴, Snowpack

`Vite`는 `Snowpack`과 아주 유사한 컨셉의 프론트엔드 빌드툴이다.
`Vue.js`의 창시자로 유명한 Evan You가 개발했고 이름값을 하는 것 같다. `SvelteKit`도 `Snowpack`을 손절하고 `Vite`로 갈아탄 듯 하다 (웃픈...)

`SvelteKit`에서 설명하는 `Vite`의 비교장점은 `Snowpack`보다 `SSR`을 더 잘 지원한다는 부분이었고, 내가 느낀 장점은 `Snowpack`은 chrome devtools에 tsc와 esbuild로 이미 빌드가 된 상태의 js 파일을 보여줘서 source탭을 무용지물로 만드는 반면 `Vite`는 소스맵을 잘 지원한다는 점이다. 가장 큰 차이점은 최종 빌드를 `rollup`으로만 제공하기 때문에 통합된 개발환경을 제공한다는 점이다.

웹팩에 추가 설정을 붙이려면 craco같은 라이브러리로 조작해야하는 확장성 제로 CRA에 비해 자체적으로 config를 수정할 수 있도록 지원하나, `jest` 세팅이나 svg to component 등을 하나하나 스스로 해야한다는 단점도 존재한다.

다만 그렇기 때문에 함께 설치되는 라이브러리 수도 적고 설치부터 실행까지 걸리는 시간도 굉장히 적게 소요된다. [StackBlitz](https://stackblitz.com/)나 [CodeSandbox](https://codesandbox.io/)에서도 Vite를 지원하고 있기 때문에 `react-router`처럼 예제를 `Vite`로 구현한 라이브러리도 많아지고 있다.
그러니까 사이드 프로젝트에는 `Vite` 쓰자.
https://vitejs.dev/
