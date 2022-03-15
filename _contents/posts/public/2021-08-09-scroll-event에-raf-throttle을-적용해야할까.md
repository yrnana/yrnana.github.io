---
title: 'scroll event에 rAF throttle을 적용해야할까'
date: '2021-08-09T10:44:54+09:00'
excerpt: '스크롤 이벤트는 브라우저가 스크롤 위치 변경을 렌더링 할때마다 트리거 되는 것이여서 자체적으로 rAF가 제공해주는것과 동일한 결과를 갖는다.'
tags: [Performance, throttle]
---

프론트엔드 개발할때 가장 많이 사용하는 최적화 방법 중 하나가 쓰로틀링 / 디바운싱이다. throttle과 debounce는 자주 실행되는 함수들의 실행빈도를 줄여서 성능을 개선할 수 있다. throttle의 경우 함수 실행을 지연시켜서 실행 횟수를 줄이면서 지정한 시간동안 한번의 실행을 보장하고, debounce는 여러번 발생하는 이벤트를 단일 이벤트로 묶는다는 차이가 있다. 예를 들면 스크롤 이벤트에 throttle을 적용하는 경우 이벤트가 일정시간마다 발생하고, debounce를 적용하는 경우 스크롤 이벤트가 끝난 후 (또는 시작 직후)에만 발생하게 된다.

쓰로틀링과 디바운싱은 `lodash` 라이브러리에서 제공하는 함수로 쉽게 적용할 수 있다. `lodash`에서 제공하는 `throttle`함수는 아무런 옵션(시간값)을 주지 않으면 기본적으로 `requestAnimationFrame` 기반으로 동작한다. 즉, `raf-schd`같은 라이브러리를 추가로 설치하지 않아도 rAF 기반 쓰로틀링을 사용할 수 있다.

그동안 브라우저 렌더링 성능을 위해 스크롤 이벤트에 무조건 rAF 기반 쓰로틀을 적용했었는데 뭔가 미심쩍은 부분이 있어 테스트와 구글링을 해보니 다음과 같은 사실을 알게 되었다.

> 스크롤 이벤트는 브라우저가 스크롤 위치 변경을 렌더링 할때마다 트리거 되는 것이여서 자체적으로 rAF가 제공해주는것과 동일한 결과를 갖는다.

즉, 아래와 같이 rAF 쓰로틀을 적용한 코드와 적용하지 않은 코드가 성능상 동일하다는 것이다.

```ts
const [count, setCount] = useState(0);

const addCount = () => setCount((count) => count + 1))

useEffect(() => {
  const throttledFn = throttle(addCount);
  window.addEventListener('scroll', throttledFn);
  return () => window.removeEventListener('scroll', throttledFn);
}, []);
```

```ts
const [count, setCount] = useState(0);

const addCount = () => setCount((count) => count + 1))

useEffect(() => {
  window.addEventListener('scroll', addCount);
  return () => window.removeEventListener('scroll', addCount);
}, []);
```

그럼 앞으로 스크롤 이벤트에는 따로 throttle을 할 필요가 없을까? 여기에서는 강제 동기식 레이아웃, 레이아웃 스래싱이라는 개념을 짚고 넘어갈 수 있다. 브라우저는 최적화를 위해 reflow(=layout)가 필요한 여러개의 작업을 묶어서 큐에 쌓고 대기하다가 한번의 reflow로 전부 처리할 수 있도록 하는데, 기하학적인 값을 요청하면 이러한 최적화 작업을 무시하고 즉시 레이아웃을 reflow 한다.

```ts
function logBoxHeight() {
  console.log(box.offsetHeight);
}
```

어떤 박스의 높이를 기록하는 코드이다. 이때 `box.offsetHeight`는 브라우저에서 이전 프레임의 레이아웃값을 반환한다.

```ts
function logBoxHeight() {
  box.style.height = '200px';
  console.log(box.offsetHeight);
}
```

이런 코드를 실행하는 경우, 브라우저는 먼저 높이 변경을 실행한 후에 레이아웃을 실행해야 `box.offsetHeight`에서 정확한 값을 반환할 수 있다. `offsetHeight`이라는 호출 자체는 레이아웃을 무조건 발생시키는 조건은 아니지만 선행조건에 따라 **강제 동기식 레이아웃**을 발생시키는 것이다.

```ts
function logBoxHeight() {
  console.log(box.offsetHeight);
  box.style.height = '200px';
}
```

이러한 현상을 피하기 위해서는 읽는 것은 마지막 프레임의 값으로 하도록 하고, 스타일은 나중에 적용하도록 실행 순서에 유의해야 한다.

`window.requestAnimationFrame(callback)`은 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 `callback`을 실행해서 해당 애니메이션을 업데이트 하도록 한다. 즉, 기하학적 값이나 스크롤 stuff를 읽는 작업을 현재 프레임에서 실행하고, `requestAnimationFrame`의 콜백으로 쓰기 / 수정 로직을 넘기면 다음 프레임에서 함께 실행하도록 예약이 가능하다. 이로써 단일 렌더링 프레임 내에서 여러 업데이트를 수행할 위험을 방지할 수 있다. 이를 쓰로틀링과 함께 적용하면 아래와 같다.

```ts
let lastScrollY = 0;
let ticking = false;

const changeBoxWidth = (y: number) => {
  box.style.width = y + 100 + 'px';
};

const listener = () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      changeBoxWidth(lastScrollY);
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', listener);
```

물론 이정도의 가벼운 작업은 실제로 크롬 데브툴의 퍼포먼스탭에서 비교해보면 어떤 방식으로 구현하더라도 거의 차이가 나지 않는다. (심지어 cpu 쓰로틀링을 걸더라도) `changeBoxWidth`에 해당하는 작업이 무거운 reflow / repaint 작업일때 유의미한 결과를 얻을 수 있을 것이다. 코드 작성 후에 퍼포먼스 탭에서 실제 성능 데이터를 확인하는것이 도움이 된다.

https://codesandbox.io/s/throttle-test-3sdgv

### 참고

- https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
- https://www.html5rocks.com/en/tutorials/speed/scrolling/
- https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing
- https://gist.github.com/paulirish/5d52fb081b3570c81e3a
- https://johnresig.com/blog/learning-from-twitter/
