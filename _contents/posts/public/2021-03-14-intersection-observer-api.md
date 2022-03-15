---
title: 'Intersection Observer API'
date: '2021-03-14T00:41:42+09:00'
tags: [Web API, Intersection Observer API]
---

`Intersection Observer API`는 *타겟 요소*와 _상위 요소 or 최상위 Document의 Viewport_ 사이의 교차점 내의 변화를 비동기적으로 관찰하는 방법이다. 페이지 스크롤에 의한 lazy loading, 무한 스크롤, 스크롤에 따라 강조되는 table of contents, 광고 가시성 등의 구현을 할 때 유용하게 사용할 수 있다. 이걸 직접 구현하려면 해당 엘레먼트의 offset와 스크롤 이벤트 등을 사용해야 하는데 이러면 모든 코드가 메인 스레드에서 실행되기 때문에 성능 문제를 야기할 수 있다. `Intersection Observer API`는 타겟 요소가 다른 요소에 들어가거나 나갈 때 or 지정한 만큼 두 요소의 교차 부분이 변경될때마다 실행되는 콜백 함수를 등록할 수 있다.

## Intersection Observer 생성 및 적용

```js
const targetElement = document.querySelector('#target');
const rootElement = document.querySelector('#root');
const options = {
  root: rootElement, // default: null = viewport
  rootMargin: '0px', // default: 0
  threshold: 1.0, // default: 0
};
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // entry의 property
    // boundingClientRect, intersectionRatio, ...
  });
};
const observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
```

- `root`: 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소. root를 지정할 경우 반드시 대상 객체의 조상 요소여야 하며, 기본값은 브라우저의 Viewport 이다.
- `rootMargin`: root가 가진 여백
- `threshold`: 콜백이 실행될 대상 요소의 가시성 percentage. 50% 만큼 요소가 보일때 탐지하고 싶으면 `0.5`로 지정하면 된다. 기본값은 `0`이며 이는 요소가 1px이라도 보이면 콜백이 실행됨을 의미한다.

`observerInstance.observe(targetElement)`로 **타겟을 지정함과 동시에 콜백이 한번 실행**되고, 이후 지정된 threshold에 해당될 때마다 콜백이 실행된다.

`IntersectionObserver`는 **탭 전환을 관찰할 수 없으므로** 만일 타겟 요소가 Viewport에 보여지는 시간 등을 체크해야 하는 경우엔 `visibilitychange`를 함께 활용해야 할 것이다.

## 호환성

![](../../assets/image-2.png)
아쉽지만 생각보다 많은 브라우저에서 지원을 안 한다.
공식 [polyfill](https://www.npmjs.com/package/intersection-observer)이 존재하므로 포함시켜주는것이 좋다.

## 참고

- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
