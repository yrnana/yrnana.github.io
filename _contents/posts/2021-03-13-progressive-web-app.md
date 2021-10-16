---
title: 'Progressive Web App'
date: '2021-03-13T22:23:32+09:00'
tags: [Service Worker, PWA]
published: true
---

## Progressive Web App이란?

- **웹 앱** : 모든 사람들, 모든 장소, 모든 디바이스에서 접속이 가능하다.
- **플랫폼 네이티브 앱** : 하드웨어에 접근할 수 있고 기기 데이터와 상호작용할 수 있는 등 장치의 기능을 활용할 수 있다. 설치할 수 있으므로 오프라인에서도 동작한다.
- **PWA (Progressive Web App)** 는 모던 API로 구축되어 네이티브 앱처럼 기능성, 안정성을 제공하는 것과 동시에 웹 앱처럼 모든 사람, 모든 장소, 모든 디바이스에서 접근할 수 있도록 개발된 웹 앱을 말한다.

## PWA 요소

### 유능함

웹은 그 자체로도 다양한 기능을 갖추고 있다. 예를 들면 `WebRTC`, `Geolocation API`, `Push notification` 등을 활용하면 비디오 채팅 앱을 개발할 수 있다. `Web Assembly`가 등장하면서 개발자는 `C`, `Rust`로 작업한 기능들을 웹에 적용할 수도 있다.

### 신뢰할 수 있음

PWA는 네트워크 속도에 관계 없이 빠르고 신뢰할 수 있어야 한다. 페이지 로드가 빨리 되어야 하고, 버튼 클릭이 오류 없이 동작해야만 하며, 버벅이는 증상이 없어야 한다. 또한 사용자는 네트워크가 느리거나 오프라인이더라도 앱이 정상적으로 나오거나 문제가 있음을 넌지시 알려주길 원한다. `Service Worker`과 `Cache API`를 활용하면 네트워크 독립적인 앱 개발이 가능하다.

- [offline 예제](https://serviceworke.rs/offline-fallback_demo.html)
- [network or cache 예제](https://serviceworke.rs/strategy-network-or-cache_demo.html)
- [offline 예제 2](https://web.dev/offline-fallback-page/)

### 설치 가능함

설치된 PWA는 브라우저 탭 대신 독립 실행형 창 위에서 실행될 수 있다.

### 발견이 가능함

검색엔진을 통해 찾을 수 있다. `<meta>` 태그를 사용하여 메타 데이터를 지정하거나, `web app manifest`를 정의하면 된다.

- [web app manifest 정의](https://web.dev/add-manifest/)

### 연결 가능함

URL으로 공유가 가능해야 한다. 앱 스토어에서 설치하지 않아도 URL만으로도 앱에 연결할 수 있는 것이 웹의 장점이다.

### progressive (점진적이어야 함)

구형 브라우저에서도 기본적으로 접근은 가능해야 하고, 신형 브라우저에서는 모든 기능을 제공할 수 있어야 한다.

### Re-engageable (재참여가능)

새 컨텐츠가 있을때 알림을 보낼 수 있다. `Web Push API`와 `Notifications API`를 활용하면 이 작업을 수행할 수 있다.

- [Push 예제](https://serviceworke.rs/push-payload_demo.html)

## 참고

- https://web.dev/what-are-pwas
- https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps
- https://serviceworke.rs
- https://create-react-app.dev/docs/making-a-progressive-web-app
