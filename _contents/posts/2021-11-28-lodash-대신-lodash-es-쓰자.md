---
title: 'lodash 대신 lodash-es 쓰자'
date: '2021-11-28T10:55:33+09:00'
excerpt: '`lodash-es`를 써야 tree shaking이 된다.'
tags: [lodash]
published: true
---

자바스크립트 유틸 라이브러리인 `lodash`는 자바스크립트 개발자들이 가장 많이 사용하는 라이브러리 중 하나다. 비슷한 라이브러리로 `underscore`가 있는데, lodash가 underscore의 superset 개념이고 성능이 더 우수하다고 한다.

프론트엔드에서는 전송 사이즈를 줄이기 위해 `tree shaking` 즉 사용하지 않는 코드를 제거하는데, webpack이나 rollup 등의 번들러에 포함된 기능이다. 다만 es6 형식으로 export 된 라이브러리가 아니라면 트리셰이킹을 적용하기 어렵다. (commonJS 방식의 라이브러리를 트리셰이킹 하는 것이 아예 불가능한 것은 아니나, 잘 안 될 가능성이 높다)

`lodash` 또한 아래와 같이 작성해도 트리셰이킹이 적용되지 않는다.

```ts
// 69.6K (gzipped: 24.6k)
import { debounce, throttle } from 'lodash';
```

![lodash](../assets/lodash.png)

lodash는 꽤 용량이 큰 라이브러리라, 무심코 트리셰이킹이 되었다고 생각하고 쓰지 않도록 주의해야 한다. 이를 해결하기 위한 방법은 아래와 같다.

- es6 구문으로 쓰여진 `lodash-es`를 사용한다. ✅
- cherry-picking 한다.
- `babel-plugin-lodash`를 설치한다.

이 중에서는 `lodash-es`를 사용하는 방법이 간편하다.

```ts
// 2.7K (gzipped: 1.2k)
import { debounce, throttle } from 'lodash-es';
```

## Reference

- https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking
