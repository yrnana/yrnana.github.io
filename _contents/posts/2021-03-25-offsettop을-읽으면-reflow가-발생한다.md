---
title: 'OffsetTop을 읽으면 reflow가 발생한다?'
date: '2021-03-25T20:38:50+09:00'
tags: [Browser, reflow]
published: true
---

[What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) 라는 문서를 보는데 **Getting box metrics** 즉 `offsetTop`, `getBoundingClientRect()` 등을 호출하는 api도 적혀 있었다.
아니 이게 무슨 소리야...내가 reflow를 마구 발생시키고 있었다니...?

그런데 댓글을 보다보니 퍼포먼스탭에서 reflow를 확인할 수 없었다는 얘기도 있어서 실제로 `offsetTop`을 읽는 테스트 화면을 구현해서 퍼포먼스탭을 보니 reflow가 발생하지 않았다. 음?

이 부분이 궁금해서 여러가지 글들을 읽어봤는데, `offsetTop`을 읽는 것 자체가 무조건 reflow를 발생시키지는 않는다. 하지만 `offsetTop`을 읽기 위해서 브라우저가 렌더링 큐에 쌓인 모든 작업을 수행하면서 reflow를 발생시킬 수 있다고 한다.
브라우저는 **최적화**를 위해 reflow가 필요한 여러개의 작업을 묶어서 큐에 쌓아서 대기하다가 **한번의 reflow로 전부 처리**할 수 있도록 하는데, `offsetTop` 등의 계산된 스타일에 get 요청을 하면 최신값을 읽기 위해 큐를 flush하고 모든 변경사항을 적용한다.

구글 개발자들이 렌더링 퍼포먼스를 개선하는 방법으로 작성한 글 중 [강제 동기식 레이아웃 피하기 & 레이아웃 스래싱 피하기](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?hl=ko)도 같은 원리다.

```js
// bad
function resizeAllParagraphsToMatchBlockWidth() {
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}

// good
const width = box.offsetWidth;
function resizeAllParagraphsToMatchBlockWidth() {
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = width + 'px';
  }
}
```

위와 아래 코드의 결과는 동일하지만 성능 차이가 나는 이유이기도 하다. 단순히 `box.offsetWidth`를 읽는게 문제가 아니고, `paragraphs[i]`의 너비가 변경되면서 스타일이 변경되었기 때문에 `box.offsetWidth`의 정확한 계산값을 얻기 위해 큐를 flush하고 스타일을 적용해야 하므로 화면을 반복해서 reflow - repaint 하게 된다.

## 참고

- https://gist.github.com/paulirish/5d52fb081b3570c81e3a
- https://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
- https://developer.chrome.com/docs/devtools/evaluate-performance/
- https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?hl=ko
