---
title: 'Context API가 존재하지만 여전히 사람들이 redux와 전역 상태관리 라이브러리를 쓰는 이유'
date: '2021-08-21T16:31:55+09:00'
excerpt: 'context api는 글로벌 상태관리 라이브러리를 대체할 수 없고, 여전히 많은 리액트 개발자들이 redux, mobx 등을 사용하고 있다.'
tags: [Jotai, React, Recoil, context API, Redux]
---

## 전역(global) 상태관리

옛날옛적 호랑이 담배피던시절(?) 리액트의 러닝커브를 올리는 주범은 `redux`라고 해도 과언이 아닐 정도로 리덕스는 리액트를 개발하려면 `react-router-dom`과 함께 필수로 배워야 하는 서드파티 라이브러리였으며 보일러 플레이트 코드도 엄청난 양을 자랑했던 그런 라이브러리였다. (reducer, action, ...)

![](../../assets/image-16.png)

일반적으로 리액트 데이터는 부모로부터 자식으로 props를 통해 탑-다운으로 전달되는데, 이 단계가 너무 많아진다거나 전달을 여러곳에 해줘야하는 경우에 전역 스토어에 데이터를 저장하고 이를 데이터가 필요한 컴포넌트에 따로 공유할 수 있다.
어떤 데이터를 전역/로컬에 저장할 것인지는 개발자가 선택해야한다. 몇단계만 전달하면 되거나 굳이 전역으로 관리할 필요 없는 데이터를 전역 스토어에 넣는 것은 코드의 관리 측면에서도 좋지 않다.

## context api

리액트 16.3부터 도입된 context api를 사용하면 네이티브 리액트만으로 전역 상태관리가 가능하다. 거의 모든 상태관리 라이브러리들은 이 api를 기반으로 개발되어있다.

```tsx
type State = boolean;
type Dispatch = React.Dispatch<React.SetStateAction<State>>;
const ModalContext = React.createContext<[State, Dispatch]>([false, () => {}]);

const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <ModalContext.Provider value={[show, setShow]}>
      {children}
    </ModalContext.Provider>
  );
};
```

`React.createContext` 메서드를 통해서 컨텍스트를 만들면 Provider와 Consumer가 제공된다. 위의 코드는 `useState`가 반환하는 값을 Provider에 제공한 형태다.

```tsx
const App = () => {
  return (
    <ModalProvider>
      <Modal />
    </ModalProvider>
}
```

위와 같이 위에서 만든 Provider로 감싸주면, `<Modal />`은 Provider에 저장된 값을 사용할 수 있다.

### 리액트와 하위 컴포넌트 리렌더링

이런 식으로 개발하는 이유는 리액트의 렌더링 특성 때문이다. 기본적으로 리액트는 상위 컴포넌트에서 `state`가 변하면 하위 컴포넌트를 전부 렌더링한다.

```tsx
const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show}</button>
      <Child />
    </div>
  );
};

const Child = () => <div>hello react!</div>;
```

위와 같은 코드가 있다고 하자. 버튼을 누르면 `show`라는 `App` 내의 `state` 값이 변경된다. `<Child />`는 `show`라는 props를 쓰지 않지만, 하위 컴포넌트이기때문에 렌더링이 된다. 이를 방지하기 위해서 아래와 같은 방법을 사용할 수도 있다.

```tsx
const Child = React.memo(() => <div>hello react!</div>);
```

`React.memo`의 두번째 인자로 아무것도 반환하지 않는다면 자체적으로 props를 비교해서 렌더링 여부를 결정하고, 렌더링 여부 기준을 직접 작성할 수도 있다. 하지만 **그렇다고 해서 memo를 무분별하게 남발하는건 좋지 않다.** 현재 리렌더링을 memo 하려는 컴포넌트에서 비교 연산과 리렌더링 중 어느 쪽이 퍼포먼스 최적화에 더 적합한지 확인이 필요하기 때문이다.

```tsx
const App = () => {
  return (
    <Wrapper>
      <Child />
    </Wrapper>
  );
};

const Child = () => <div>hello react!</div>;

const Wrapper: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show}</button>
      {children}
    </div>
  );
};
```

비교적 간단한 해결방법은 위와 같이 `children`을 활용하는 것이다. 위의 코드에서 `children`은 리렌더링이 되지 않는다.

```tsx
const App = () => {
  return (
    <ModalProvider>
      <ModalToggleButton />
      <Modal />
    </ModalProvider>
  );
};

const ModalToggleButton = () => {
  const [, setShow] = useContext(ModalContext);

  return <button onClick={() => setShow((state) => !state)}>모달토글</button>;
};

const Modal = () => {
  const [show] = useContext(ModalContext);

  return show ? <div>나 모달</div> : null;
};
```

마찬가지로 `ModalProvider` 내부에서 `show`가 변경되더라도 `children`인 `<Modal />`과 `<ModalToggleButton />`에는 영향을 주지 않는다. 리액트에서는 `useContext`라는 훅을 제공해주는데 이 훅에 컨텍스트를 주입하면 아무 컴포넌트에서 컨텍스트 프로바이더에 저장된 값을 사용할 수 있다.

### context api의 문제

그런데 이 코드에 심각(?)한 문제가 있다. 버튼을 클릭하면 `<Modal />`만 렌더링 되는 것이 아니라 `<ModalToggleButton />`도 같이 렌더링이 되는 것이다. `Context.Provider`는 `value`로 저장된 값이 변경되면 `useContext(Context)`를 사용하는 컴포넌트도 같이 렌더링을 한다. 그렇기 때문에 `show`라는 상태를 사용하지 않는 `<ModalToggleButton />`도 같이 렌더링이 된다.

이를 해결하려면 아래와 같이 코드를 작성해야 한다.

```tsx
type State = boolean;
type Dispatch = React.Dispatch<React.SetStateAction<State>>;
const ModalStateContext = React.createContext<State>(false);
const ModalDispatchContext = React.createContext<Dispatch>(() => {});

const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <ModalStateContext.Provider value={show}>
      <ModalDispatchContext.Provider value={setShow}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext>
  )
}

const App = () => {
  return (
    <ModalProvider>
      <ModalToggleButton />
      <Modal />
    </ModalProvider>
  )
}

const ModalToggleButton = () => {
  const setShow = useContext(ModalDispatchContext);

  return <button onClick={() => setShow((state) => !state)}>모달토글</button>;
}

const Modal = () => {
  const show = useContext(ModalStateContext);

  return show ? <div>나 모달</div> : null;
}
```

컨텍스트를 상태값 / 액션으로 나누어서 위에서 언급한 리렌더링 문제는 발생하지 않는다. 그런데 딱 봐도 코드가 좀 지저분하고 보일러플레이트 코드가 너무 많다. 거기다 지금은 간단한 `boolean`값이었지만, 만약 복잡한 `state`라면 어떨까? `object`에서 상태가 부분적으로 변경이 되더라도 컨텍스트를 사용하는 모든 컴포넌트가 리렌더링 될 것이다. 그리고 컨텍스트를 추가할 때마다 프로바이더로 매번 감싸줘야하기 때문에 **Provider hell**을 야기할 수 있다.

```ts
// 이러한 state를 다룰때
const state = {
  foo: {
    bar: '?',
  },
  hello: 'world',
};

// context -> state.hello가 변하더라도 리렌더링된다
const context = useContext(FooBarStateContext);
const value = context.foo.bar;

// redux -> state.foo.bar가 변경될때만 리렌더링된다
const value = useSelector((state) => state.foo.bar);
```

> 이렇기 때문에 context api는 글로벌 상태관리 라이브러리를 대체할 수 없고, 여전히 많은 리액트 개발자들이 redux, mobx 등을 사용하고 있는 것이다.

## 전역 상태관리 라이브러리 소개

유명하거나 알아두면 좋은 라이브러리 위주로 간단하게 짚어보려고 한다.

### redux

한때는 리액트를 어렵게 만드는 주범이었지만 hook 도입과 [redux-toolkit](https://redux-toolkit.js.org/) 등장 이후로 사용이 정말 간편해졌다. 나도 `mobx`로 잠깐 도피했었다가 mobx는 hook 지원을 빠릿하게 대응하지 않았고 redux팀은 hook 전환에 빠르게 대응했기 때문에 다시 `redux`로 갈아탔다.

### mobx

리덕스가 휘황찬란한 보일러플레이트를 남발하던 시절 mobx는 `class`로 store를 정의하고 스토어를 하나로 관리한다는 느낌이 있어서 상당히 편리했다. 그러나 hook 대응이 다소 미적지근했고, class와 데코레이션을 사용하는 것 자체가 진입장벽이 될 수도 있을 것 같다. 예전에는 백엔드에서 프론트엔드로 전향하는 개발자들이 스프링의 어노테이션과 비슷한 데코레이터를 보고 친숙함을 느낄 수도 있었겠지만 요즘은 프론트엔드부터 배우는 학생들이 많으니 말이다. (물론 mobx에 다른 스토어 선언 방법도 존재하는데, 이런 다양함이 mobx를 더 어렵게 만든다) `redux-toolkit`으로 인해 사용방법이 정돈이 된 리덕스와 달리 mobx는 다양한 사용법을 제시하다보니 이 점이 혼란을 일으키는 것 같다. 개인적으로는 더이상 추천하지 않음!

### recoil

페이스북에서 공식적으로 개발하고 있는 전역 상태관리 라이브러리다. 아직 알파버전이지만 프로덕션에 도입한 곳도 꽤 있는 듯 하다. 스토어 선언이 상당히 간편하고 간결하다. context advanced 같은 느낌으로, 위에서 언급한 `context api`의 문제점을 겪지 않아도 되며 리덕스로 따지면 `selector` 같은 기능도 제공한다. 리덕스가 툴킷이 생기면서 많이 간소화 되었다고는 하나 거의 `useState` 쓰는 느낌인 recoil에 비할바는 못된다. 개인적으로 사이드 프로젝트에서 활용하고 있고, 신규 프로젝트에는 recoil을 도입하고 있다.

### jotai

조타이는 위 3개보단 덜 유명한 라이브러리긴 하지만 이번에 서비스 개발할때 도움을 받은지라 소개해본다. 사용법이나 컨셉 자체는 recoil과 거의 유사하며, `react-spring`을 개발한 팀에서 만든 오픈소스 라이브러리다. recoil과의 비교는 공식 문서를 참고하면 좋을 것 같은데 아무래도 `key`를 선언하는 recoil보다는 객체의 아이덴티티에 의존하기 때문에 간단한 데이터를 다루는 정도일때 사용하는 것이 좋다고 한다.
직접 사용해봤을때의 장점은 **Provider가 optional**이라는 점이고, 용량이 gzip 2kB로 매우 가벼운 라이브러리라는 것이다. (recoil은 20kB) 단점은 `react-refresh` 대응 문제가 있다. (개발중인 코드를 수정하면 앱의 `state`가 날아간다)
때문에 이미 redux나 mobx를 사용중인 프로젝트에서 렌더링 최적화를 위해 작은 데이터를 컨텍스트로 다루고 싶을때 대용으로 사용하기 좋을 것 같다.
