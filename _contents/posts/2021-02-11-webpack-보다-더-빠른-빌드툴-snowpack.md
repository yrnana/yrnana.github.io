---
title: 'Webpack 보다 더 빠른 빌드툴, Snowpack'
date: '2021-02-11T04:03:33+09:00'
excerpt: '스노우팩은 unbundled during development 즉 개발중에 번들링을 하지 않겠다는 컨셉의 프론트엔트 빌드툴이다.'
tags: [esbuild, Snowpack]
preview: '../assets/1_p8BBVAqCByV9kA24Vxo6Pg.png'
published: true
---

> 🚨 **Update**  
> https://velog.io/@yrnana/Webpack-보다-더-빠른-빌드툴-Vite  
> `Snowpack`과 유사한 컨셉의 `Vite`를 추천하는 이유

# Snowpack

스노우팩은 unbundled during development 즉 개발중에 번들링을 하지 않겠다는 컨셉의 프론트엔트 빌드툴이다.

## Unbundled Development

![](../assets/image-12.png)
예를들면 현재 빌드툴로 가장 많이 사용되는 `webpack` 같은 경우, 파일 하나가 변경될 경우 연관된 모든 파일을 다시 빌드하고 다시 번들링 해야 한다. 그래서 시간 복잡도를 `O(n)` 으로 가져가야 한다.
스노우팩은 개발중에 모든 파일들을 단일 파일로 빌드하고 `esm` 방식으로 import 한다. 만약 어떤 파일이 변경되면 그 파일만 새로 빌드된다. 즉 `O(1)` 빌드 시스템인 셈이다.

npm 패키지의 경우 `CommonJS` 구문으로 작성되어 있을수도 있기 때문에 개발자가 직접 작성하는 파일처럼 패키지 내 모든 파일들이 하나하나 import 되지 않고, 아래와 같이 단일 파일로 빌드해서 import 한다.

> `node_modules/react/**/* -> http://localhost:3000/web_modules/react.js` > `node_modules/react-dom/**/* -> http://localhost:3000/web_modules/react-dom.js`

## Create Snowpack App

Create React App 처럼 [Create Snowpack App](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)을 제공하기 때문에 좀더 쉽게 접할 수 있다. 확장성이 떨어지는 zero-config를 추구하는 CRA와는 달리, [snowpack.config.js](https://www.snowpack.dev/reference/configuration) 라는 파일이 존재하고 이 파일을 기반으로 커스텀이 가능하다. 그렇지만 webpack.config.js 보다는 훨씬 다루기가 쉽다!
특이한 점은 기본 테스트 라이브러리로 `jest`가 아닌 `@web/test-runner`을 채택했다. 물론 `jest`도 사용할 수 있지만, 자체 테스트에서 `@web/test-runner`가 성능이 더 좋았다고 한다.

## esbuild

![](../assets/image-13.png)
`esbuild`는 go로 쓰여진 자바스크립트 번들러로 자체 벤치마크상에서 `webpack`보다 100배 이상의 성능을 낸다고 내걸고 있다. 스노우팩은 내부적으로 `esbuild`를 단일파일빌더로 사용하고 있는데, 스노우팩 V3부터는 `esbuild` 기반 내장 빌드 최적화 파이프라인을 지원한다. 여기서 최적화 파이프라인이라는 것은 production을 위한 최종 빌드 과정에서 bundle, minify, code splitting, treeshake, targetting, preload 등을 하는 것이다. 이렇게 스노우팩은 `esbuild`를 활용해서 자바스크립트라는 언어의 성능상 한계를 극복하려고 한다. 다만, 아직 esbuild 자체가 [not yet production-ready](https://esbuild.github.io/faq/#production-readiness) 이다보니 스노우팩도 큰 규모의 프로젝트에서는 [웹팩 플러그인](https://www.npmjs.com/package/@snowpack/plugin-webpack) 사용을 권장하고 있다.

## 정리

스노우팩이 아직 완벽하게 웹팩을 대체할 수 있는 건 아니다. FE개발자들이 많이 사용하는 스토리북이 웹팩 기반이기도 하고 (같이 사용하기엔 [환경변수](https://www.snowpack.dev/reference/environment-variables) 매칭이 복잡함) `esbuild`가 React17의 `JSX Transform`을 지원하지 않는 문제도 있다. 그럼에도 [2020 state of js](https://2020.stateofjs.com/en-US/technologies/build-tools/)에서 `webpack`을 제치고 매우 높은 만족도를 얻은 점도 그렇고 `unbundled development`라는 컨셉도 그렇고 상당히 기대가 되는 빌드툴인 것 같다. 현재 레포가 그다지 큰 프로젝트도 아닌데 fast refresh 속도나 스토리북이 실행되는 속도가 썩 빠르지 않은지라 스노우팩의 등장이 더욱더 흥미진진하다. 개인적으로는 토이플젝에서 자주 쓰게 될 것 같다.
