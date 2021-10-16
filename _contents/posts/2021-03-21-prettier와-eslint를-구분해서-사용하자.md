---
title: 'prettier와 eslint를 구분해서 사용하자'
date: '2021-03-21T21:56:06+09:00'
excerpt: '결론부터 말하자면 오류를 잡으려면 린터, 스타일을 교정하려면 포맷터를 사용하자.'
tags: [ESLint, Prettier]
published: true
---

## Prettier와 eslint

`Prettier`는 **formatter**고 `eslint`는 **linter**이다. 두 개의 차이점과 사용법을 알아야 더 스마트하게 사용할 수 있다. 개취지만 포맷팅 안 된 코드 상종 안 한다. (SI 다닐때 정말 힘들었...)

> 결론부터 말하자면 **오류를 잡으려면 린터, 스타일을 교정하려면 포맷터**를 사용하자.

린터 룰은 크게 포맷팅(스타일) 룰과 코드 퀄리티 룰이라는 두가지 카테고리로 나눌 수 있다. 사용되지 않은 변수를 오류로 분류하는 `no-unused-vars` 같은 코드 퀄리티 룰은 prettier 같은 포맷터가 잡아낼 수 없다. prettier는 코드 포맷팅에 특화되어 있으므로 eslint가 할 수 없는 최대 글자 길이에 맞춘 자동 포맷팅을 할 수 있다.

## Prettier와 eslint를 같이 사용하기

그렇다면 prettie와 eslint를 동시에 사용하려면 어떻게 설정해야 할까?
예를 들면 facebook 팀에서 제공하는 `eslint-config-react-app`(`CRA`를 사용하면 기본적으로 세팅되어있는 eslint config)을 사용하는 경우 non-style 룰만 포함되어 있기 때문에 별다른 설정 없이 prettier를 같이 사용해도 문제가 안 된다.

그런데 일부 eslint config (e.g. `eslint:recommended`)를 설치해서 사용하려는데 prettier와 충돌하는 경우 어떻게 해야할까? 여러가지 접근법이 있는데, prettier 실행 후 eslint를 실행하는 방법(`prettier-eslint`)이 있고, **충돌하는 eslint 규칙을 전부 꺼주는 방법**(`eslint-config-prettier`)도 있다. 앞서 설명했다시피 두 개의 역할을 구분하는 것이 좋으므로 후자의 방법을 추천한다. `prettier-eslint`의 메인테이너도 2017년에 이미 이 패키지를 사용하지 않는다고 밝혔다.

https://twitter.com/kentcdodds/status/913760103118991361

린터 rules인 것 처럼 prettier를 실행하는 플러그인인 `eslint-plugin-prettier`는 <span style="color: red">사용하지 말자</span>. 특정 상황에서 유용할 수도 있지만 prettier를 직접 실행하는 것 보다 느리다.

번호를 매겨 정리하자면 다음과 같다.

> 1. `eslint-config-prettier` : eslint에서 prettier와 충돌할 수 있는 rule을 꺼버림 ✅
>    코드 오류를 잡는데는 eslint, 코드 포맷팅에는 prettier를 사용하는 방법이다.
> 2. `eslint-plugin-prettier` : prettier를 eslint의 rules로 동작하게 함
>    포맷팅 문제도 오류로 출력되어서 오류 메시지가 지나치게 많아지며 느리다.
> 3. `prettier-eslint` : prettier를 실행하고 나서 eslint --fix를 실행함
>    prettier를 단독으로 실행하는 것 보다 훨씬 느리다.

## vscode에서 eslint, prettier 사용하기

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode extension을 설치한다.
- 프로젝트에 eslint와 prettier를 설치한다.

```sh
# CRA를 사용하는 경우 eslint는 이미 설치되어있으므로 prettier만 설치해도 된다
npm i -D eslint prettier
```

- vscode setting에서 prettier를 기본 포맷터로 지정한다.

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

- `.prettierrc`에 prettier 설정을 작성한다.
- `.eslintrc`에 eslint 설정을 작성한다.
- (옵션) prettier 설정과 충돌하는 eslint 설정을 사용하는 경우
  - `eslint-config-prettier`를 설치하고 `.eslintrc`에 추가한다.

```sh
npm i -D eslint-config-prettier
```

```json
{
  "extends": ["airbnb", "prettier"]
}
```

## 참고

- https://prettier.io/docs/en/comparison.html
- https://prettier.io/docs/en/integrating-with-linters.html
- https://duncanleung.com/profile-measure-find-remove-slow-eslint-rules/
- https://github.com/prettier/prettier-eslint/issues/101#issuecomment-313233479
