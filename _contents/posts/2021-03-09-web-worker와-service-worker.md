---
title: 'Web Worker와 Service Worker'
date: '2021-03-09T23:15:32+09:00'
tags: [Service Worker, Web Worker]
published: true
---

브라우저는 자바스크립트를 실행하기 위해서 **싱글 스레드**를 사용하므로 거대한 자바스크립트 코드를 돌리면 메인 스레드가 block 되고 사용자 경험이 악화될 것이다. 앱에서 다중 스레딩 모델을 사용하는 것 처럼, 웹에서는 `Worker`를 사용해서 백그라운드 스레드에서 스크립트를 실행할 수 있다.

## Web Worker와 Service Worker

### 공통점

- 추가 스레드에서 실행되므로 메인 스레드를 블록하지 않고 실행될 수 있다.
- `Window`나 `Document` 객체에 접근할 수 없어서 DOM과 직접적으로 interact 할 수 없고 browser API에 접근하는데 한정적이다.

### 차이점

- 서비스 워커는 `fetch` event와 같은 네트워크 요청을 탈취하거나 `push` event와 같은 Push API를 listen 할 수 있다.
- 페이지는 여러개의 웹 워커를 생성할 수 있지만, 단일 서비스 워커는 등록된 scope내에서 모든 활성 탭을 제어한다.
- 웹 워커의 수명은 자신이 속한 탭과 밀접하게 결합되는 반면, 서비스 워커의 수명은 독립적이다. 따라서 웹 워커가 실행중인 탭을 닫으면 워커가 종료되지만, 서비스 워커는 활성 탭이 열려있지 않아도 백그라운드에서 계속 실행될 수 있다.

## 사용 사례

### Web Workers

웹 워커는 주로 UI block을 피하기 위해 무거운 연산이 소요되는 작업(AI, games, image encoding, etc)을 보조 스레드에서 실행하기 위해 사용된다.

- [Comlink](https://github.com/GoogleChromeLabs/comlink)
- [React + Redux + Comlink](https://dassur.ma/things/react-redux-comlink/) : off the main thread (OMT) 아키텍처를 리액트에서 구축하는 방법
- [Webpack용 플러그인](https://github.com/GoogleChromeLabs/worker-plugin)

### Service Workers

서비스 워커는 일반적으로 네트워크 프록시 같은 역할이나 백그라운드 작업, 캐싱, 오프라인을 처리하는데 사용된다.

- [Workbox](https://developers.google.com/web/tools/workbox)
- [페이지와 서비스 워커간 양방향 통신 사례](https://web.dev/two-way-communication-guide/)
- [Broadcast Updates](https://web.dev/broadcast-updates-guide/) : Window to Service Workers 사례
- [명령형 캐싱](https://web.dev/imperative-caching-guide/) : 페이지에서 서비스워커를 호출하여 리소스를 미리 캐싱

## 참고

- https://web.dev/workers-overview/
- https://developers.google.com/web/fundamentals/primers/service-workers
