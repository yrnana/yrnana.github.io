---
title: 'framer-motion : react를 위한 motion & gesture 라이브러리'
date: '2021-02-13T02:14:33+09:00'
excerpt: 'framer-motion는 리액트에서 애니메이션과 제스쳐를 쉽게 다룰 수 있도록 해주는 라이브러리다.'
tags: [React, Framer Motion]
published: true
---

`framer-motion`는 리액트에서 애니메이션과 제스쳐를 쉽게 다룰 수 있도록 해주는 라이브러리다. `animate` props에 값을 세팅하면 `CSS transitions`를 자동생성하는 방법으로 애니메이션을 만들어주고, drag나 hover 등의 제스쳐를 지원해주기도 하고, 단일 애니메이션 prop으로 하위 트리까지 이어지는 애니메이션을 적용할 수도 있다.

## 설치

```sh
npm install framer-motion
```

```jsx
import { motion } from 'framer-motion';

<motion.div animate={{ scale: 0.5 }} />;
```

motion은 다음과 같이 설치하고 선언해서 사용할 수 있다.

## motion components

`motion.div`, `motion.svg` 이렇게 html 요소나 svg 요소에 대응할 수 있는 컴포넌트로 다른 부분은 스태틱 요소와 동일하나 애니메이트, 제스쳐 등을 설정할 수 있다.

```jsx
<motion.div
  animate={{
    x: 0,
    backgroundColor: '#000',
    boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    transitionEnd: {
      display: 'none',
    },
  }}
/>
```

`transform` 속성으로 CSS 애니메이션을 구현하면 브라우저가 GPU를 활용하기 때문에 `left` 대신 `x` 옵션을 사용하는 것이 더 빠르다고 한다.

```jsx
// GPU accelerated (fast)
<motion.div style={{ x: 0 }} animate={{ x: 100 }} />

// CPU drawing (slower)
<motion.div style={{ left: 0 }} animate={{ left: 100 }} />
```

## 사용예시

### Animation

```jsx
<motion.div animate={{ scale: 2 }} />
```

`animate` prop는 값을 객체로 받고 이 값이 지정되면 첫 렌더링시에, 또는 변경되면 변경된 값으로 motion 컴포넌트를 애니메이팅 한다. 예를 들면 위의 motion 컴포넌트는 div 엘레먼트로 렌더링 되면서 두 배로 확대된다.

### Keyframes

```jsx
<motion.div
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
  }}
/>
```

값을 array로 넣게 되면 순서대로 실행된다. 기본적으로는 동일한 시간으로 실행되나 `transition` 프로퍼티를 조정해서 시간값을 수정할 수 있다.

### Variants

```jsx
const [isOpen, setIsOpen] = useState(false)

<motion.nav
  animate={isOpen ? "open" : "closed"}
  variants={{
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }}
>
  <Toggle onClick={() => setIsOpen(!isOpen)} />
  <motion.ul variants={{
      open: { /* */ },
      closed: { /* */ },
    }}
  />
</motion.nav>
```

`variants` props를 활용하면 선언적 방법으로 돔 전체에 전파되는 애니메이션을 만들 수도 있다. 예를 들면 위와 같은 컴포넌트에서는 `animate`가 `open`일 경우 `motion.nav`와 `motion.ul`의 `variants` 값 중 `open`값들이 실행된다.

### Gesture

```jsx
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
```

motion 컴포넌트는 `whileHover`이나 `whileTap`같은 제스처 헬퍼 props를 가지고 있다.

### Drag

```jsx
const dragAreaRef = useRef(null)
<motion.div ref={dragAreaRef} />
<motion.div drag dragConstraints={dragAreaRef} />
```

위과 같은 방법으로 드래그가 가능한 요소를 지정할 수 있고 드래그 가능한 영역도 `ref`를 넘겨주거나 `top`, `left` 등을 특정 값으로 넘겨서 지정할 수 있다.

### MotionValues

```jsx
const x = useMotionValue(0)
const background = useTransform(
  x,
  [-100, 0, 100],
  ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
)

return (
  <motion.div style={{ background }}>
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x }}
    >
      <Icon x={x} />
    </motion.div>
  </motion.div>
)
```

motion은 `MotionValue`를 애니메이션을 제어하는데 사용하는데 이것을 훅을 통해 직접 사용할 수도 있다. 위의 코드에서는 내부 motion 컴포넌트를 드래그 했을때 x가 변경되면서 background 색상도 변경된다.

### Viewport scroll

```jsx
const { scrollYProgress } = useViewportScroll()
const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

return (
  <motion.div
    style={{ scale }}
  >
    <motion.div
      style={{
        scaleY: scrollYProgress
      }}
    />
  </motion.div>
)
```

`useViewportScroll` 훅은 스크롤 관련 `MotionValues`를 제공하므로 이를 motion 컴포넌트와 결합해서 활용할 수 있다.

## 정리

여기에 적기엔 너무 많은 기능이 있는 라이브러리라 다 적기가 어렵다. 자세한 기능은 라이브러리의 [공식 docs](https://www.framer.com/api/motion/)를 참고하면 좋을 것 같다. 프론트엔드 개발을 하면서도 css 애니메이션은 다소 단순한 트랜지션만 적용하곤 했는데, 이런 라이브러리를 활용하면 상태관리나 렌더링에 대해 덜 신경쓰면서 유저에게 더 감각적인 ui/ux를 제공할 수 있지 않을까 싶다. 이런 라이브러리들을 보면 수준 높은 프론트엔드 개발을 하려면 js도 중요하지만 css를 더 잘 알아야겠다고 생각하게 되는 것 같다ㅠㅠ
