---
title: 'redux-saga를 추천하지 않는 이유'
date: '2021-08-29T15:29:45+09:00'
tags: [React Query, Redux, Redux Saga]
published: true
---

## `redux-saga`의 단점

### 생소한 generator 함수

ES6의 generator & yield는 비동기처리를 위한 함수인데 솔직히 프론트엔드 직무가 떡상한 시점에서 이미 더 간단하게 사용할 수 있는 ES7 async / await 가 등장했기 때문에 다소 생소한 문법이다. `redux-saga`는 이 generator 함수를 기반으로 하고 있어서 이에 대한 지식이 없으면 러닝 커브가 굉장히 높다. 이미 async / await 라는 훌륭한 비동기처리 문법이 존재하고 `redux-saga` 외에는 generator를 사용하는 네임드 서드파티 라이브러리가 전무한 시점에서 매우 아쉬운 부분이다.

### typescript 지원이 미흡함

`redux-saga/effects`의 타입스크립트 지원은 매우 아쉬운 수준이다.

```ts
import { call } from 'redux-saga/effects';

async function fetchUser(userId: string): Promise<User> {
  // ...
}

function* fetchUser(action) {
  const user = yield call(fetchUser, action.payload.userId); // user의 타입이 any
}
```

자동 타입 유추로 `user`가 `User`타입이기를 기대하지만 any가 나온다. call의 제네럴에 `User`를 직접 대입하거나, user에 결과값이 `User`라고 직접 작성해야만 한다.
이를 해결하기 위해 `typed-redux-saga`라는 또다른 래퍼 라이브러리를 설치하면 해결되긴 한다. 그런데 `redux-saga`도 `redux`의 서드파티 라이브러리인 시점에서 `redux-saga`의 서드파티 라이브러리를 또 설치한다...? 관리가 어떻게 될지는 알 수 없는 일이다.

### 가장 최근 릴리즈가 2019년임

아무리 훌륭한 라이브러리여도 2019년이 마지막 릴리즈인것은 이미 메인테이너가 손을 뗀 것이다. 특히 타입스크립트의 개발이 꾸준히 일어나고 있는데 개선점이 1도 없을 수는 없다. 당장 `redux-saga`의 깃헙 이슈란에 쌓인 이슈만 200개가 넘는다.
물론 하단에서 설명할 `redux-thunk`의 업데이트 역시 3년전이나, 이는 `redux`팀에서 직접 관리하는 라이브러리이며 이슈도 5개밖에 없다. 지속적으로 개발되고 있는 `@reduxjs/toolkit`에서도 이 버전을 사용하고 있으므로, 이슈가 없기 때문에 업데이트를 하지 않는 것으로 보인다.

### `redux-toolkit`은 `redux-thunk`를 기반으로 함

예전에는 `redux`의 사용방법도 불편했고 `redux-thunk`의 활용방법도 모호했기 때문에 `redux-saga`가 많이 쓰였다. 하지만 이제 `redux-toolkit`이 등장했고 아주 편하게 `redux`와 비동기처리가 가능하게 되었다. `redux-toolkit`에서는 비동기 처리를 위한 미들웨어 세팅을 기본값으로 `redux-thunk`로 해놓았고 문서에도 이를 기반으로 설명하고 있다. `redux-thunk` 대신 `redux-saga`를 사용하려면 다른 예제들을 찾아 헤매면서 직접 설정하고, 오류가 발생해도 어렵사리 해결해야 한다.

## 대안

`redux`를 사용할때 가능한 `redux-toolkit`을 사용하고 비동기 처리가 필요하다면 툴킷에 내장된 `redux-thunk`를 사용하자.
그런데 만약 서버 데이터를 비동기로 받아오기 위해 `redux`와 비동기 미들웨어가 필요한 상황이라면 이를 `redux`로 해결한다는 생각을 고심해 볼 필요가 있다. 물론 `redux`는 아주 훌륭한 클라이언트 사이드 전역 상태 관리 라이브러리지만 서버 데이터 처리나 비동기 처리 만을 위해 고안된 라이브러리는 아니다.
서버 state를 관리하기 위한 라이브러리인 `react-query`나 `swr`을 도입하면 어떨까? 물론 라이브러리를 많이 설치하면 그에 대한 사이드 이펙트는 분명 존재한다. 하지만 우리가 서버에서 받아오는 데이터를 무조건 `redux`에 저장할 필요가 없고, `isLoading`나 `error`나 데이터 캐싱 등 서버 상태를 다루기 위해 매번 서버 상태와 관련된 프로퍼티를 redux store에 추가하던 비용을 생각하면 서버 상태 관리는 클라이언트 전역 상태 관리와 분리할 필요가 있다고 본다.
사실 서버 상태를 분리하고 나면 `redux`를 사용할 일이 매우 줄어들 것이다. `recoil`이나 `jotai`같이 context api 처럼 사용할 수 있는 가벼운 전역 상태 관리 라이브러리 도입이 더 맞을 수도 있다.
