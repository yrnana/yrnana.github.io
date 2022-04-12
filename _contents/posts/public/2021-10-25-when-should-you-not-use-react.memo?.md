---
title: 'Q. When should you NOT use React.memo?'
date: '2021-10-25T07:30:46+09:00'
excerpt: '당연하지만 얕은비교연산 `===`가 어지간하면 리렌더링보다는 비용이 적게 들긴 한다. 그렇다면 왜 리액트는 `React.memo`나 `React.PureComponent`를 기본형으로 갖지 않을까?'
tags: [React, Optimization, memo]
---

## 얕은 비교와 리액트 성능 최적화

사내 FE모임 시간에 효율적인 스토리북 활용법에 대해 토론하다 "스토리북의 Control 패널을 활용하려면 렌더링 최적화가 어렵다" 라는 이야기를 하게 되었다. 그러다 인턴🤗분께서 `PureComponent`를 통한 얕은 비교로 렌더링 최적화를 하는건 어떻냐고 질문을 주셨는데, 덕분에 겉핥기로만 어렴풋이 알고 있던 리렌더링과 얕은 비교에 대해 좀더 생각해보게 된 것 같다.

> React.memo
> React.PureComponent
> shouldComponentUpdate

세가지 케이스 모두 얕은 비교를 통해 개발자가 컴포넌트의 리렌더링을 제어할 수 있는 기능을 제공한다. (`useMemo`는 역할이 조금 다르다) 리액트는 기본적으로 **상위 컴포넌트가 렌더링이 되면 무조건 리렌더링을 수행**하는 특성을 가지고 있으나 `React.memo`나 `React.PureComponent`로 감싸게 되면 컴포넌트는 `props`가 변경되었을때만 리렌더링이 된다.
당연하지만 얕은비교연산 `===`가 어지간하면 리렌더링보다는 비용이 적게 들긴 한다. 그렇다면 왜 리액트는 `React.memo`나 `React.PureComponent`를 기본형으로 갖지 않을까?

## `state`의 위치를 확인하자

```jsx
function Parent() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(1);
  const [num3, setNum3] = useState(2);

  return (
    <div>
      <Child1 number={num1} setNumber={setNum1} />
      <Child2 number={num2} setNumber={setNum2} />
      <Child3 number={num3} setNumber={setNum3} />
    </div>
  );
}

function Child1({ number, setNumber }) {
  return (
    <div>
      <div>{number}</div>
      <button onClick={() => setNumber((num) => num + 1)}>+</button>
    </div>
  );
}

// Child2, Child3, ...
```

이러한 코드에서 `Parent`의 `num1`이 변경되면 `Child2`와 `Child3`도 리렌더링이 된다.

```jsx
// `React.memo`를 활용한 얕은비교 최적화
// 이 컴포넌트는 상위 컴포넌트의 렌더링에 영향을 받지 않고, `number`와 `setNumber`가 변경될 때만 리렌더링된다.
const Child1 = React.memo(({ number, setNumber }) => {
  return (
    <div>
      <div>{number}</div>
      <button onClick={() => setNumber((num) => num + 1)}>+</button>
    </div>
  );
});
```

이렇게 각 자식 컴포넌트를 `PureComponent`로 만들거나 `React.memo`로 감싸면 얕은비교를 통해 `props`가 변경될때만 렌더링이 될 것이다. 하지만 이렇게 하는 것 보다 더 좋은 방법이 있다.

```jsx
function Parent() {
  return (
    <div>
      <Child1 />
      <Child2 />
      <Child3 />
    </div>
  );
}

function Child1() {
  const [num1, setNum1] = useState(0);
  return (
    <div>
      <div>{num1}</div>
      <button onClick={() => setNum1((num) => num + 1)}>+</button>
    </div>
  );
}
```

`state`를 그냥 각각의 `Child`가 가지면 된다. 이렇게 상태를 가능한 Leaf Node로 전달하면 불필요한 리렌더링을 피할 수 있는 것이다.

### `state`를 Leaf Node로 변경할 수 없는 경우

```jsx
function Parent() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ExpensiveAndHeavyComponent />
    </div>
  );
}

const ExpensiveAndHeavyComponentWrapper = React.memo(
  ExpensiveAndHeavyComponent,
);
```

`ExpensiveAndHeavyComponent`는 `React.memo`로 감싸지 않으면 input에 값을 입력할때마다 value라는 `state`가 변경되면서 리렌더링이 될 것이다. 이 케이스는 `state`를 Leaf Node로 전달할 수 없는데 어떻게 최적화를 할 수 있을까?

```jsx
function Parent() {
  return (
    <InputWrapper>
      <ExpensiveAndHeavyComponent />
    </InputWrapper>
  );
}

function InputWrapper({ children }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {children}
    </div>
  );
}
```

상위 컴포넌트가 변경되어도 리렌더링이 되지 않는 `children props`의 특성을 활용할 수 있을 것 같다. `React.createElement`의 세번째 인자로 넘기는 값이고, 이 역시 얕은비교를 통해 리렌더링 여부를 결정하기 때문이다.

https://twitter.com/cherthedev/status/1141706784178167810

> 리렌더링을 막기 위해 메모를 하거나 얕은 비교를 하는 것 보다, `state`의 위치를 확인하고 그냥 `state`를 내리는게 최고의 방법일 수도 있다!

## `React.memo`의 오작동

```jsx
const Memoized = React.memo(({ children }) => <div>{children}</div>);

<Memoized>Hello</Memoized> // 리렌더링 안됨
<Memoized><b>Hello</b></Memoized> // 리렌더링 됨
```

`React.memo`로 감싼 컴포넌트의 경우 `children props`를 사용하고 JSX Element를 전달하면 의도한대로 작동하지 않고 계속 렌더링이 된다.

## 최적화에 정답은 없다

`PureComponent`나 `React.memo`를 통한 최적화는 분명 간단하지만 만능은 아니며, 불필요한 리렌더링이 자주 일어난다면 코드 구조 자체를 고민해볼 필요가 있다. 물론 렌더링이 거의 일어나지 않는 화면이라면 시간낭비일수도 있다. 리렌더링에 대해서는 `<div />`를 한 뎁스 더 그리는게 시간이 더 걸리니 `React.memo`를 쓸지 말지 고민할 시간에 불필요한 div를 줄이라는 분석도 존재한다. 맨날 적는 얘기지만 Performance Optimization에 정답은 없고, 여러가지 케이스 중 최적의 결과를 도출하는 것이 개발자의 역할이 아닌가 싶다.

## 참고

- https://stackoverflow.com/questions/53074551/when-should-you-not-use-react-memo
- https://github.com/facebook/react/issues/14463
- https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#memoize-everything
- https://overreacted.io/before-you-memo/
- https://kentcdodds.com/blog/optimize-react-re-renders
