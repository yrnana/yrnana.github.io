---
title: 'React Query 사용시 주의할 점'
date: '2022-04-26T21:58:00+09:00'
excerpt: 'React Query를 사용할때 알아두면 좋은 나노 팁'
tags: [React Query]
---

React Query 를 1년간 사용하면서 요즘들어 내가 잘 모르고 사용했구나 생각한 적이 종종 있어서, 복기를 해보고자 한다.

## useQuery의 onSuccess, onError 등은 선언한 인스턴스의 수만큼 실행된다

예를 들면 아래와 같이 사용한다고 하자.

```ts
const useUserQuery = () => {
  return useQuery(['user'], getUser, {
    onSuccess: (data) => console.log('onSuccess', data),
  });
};

function Parent() {
  return (
    <>
      <Child />
      <Child />
      <Child />
    </>
  );
}

function Child() {
  const { data } = useUserQuery();

  return <div />;
}
```

`<Child />` 컴포넌트가 3개 선언되었으므로 `useUserQuery()` 인스턴스는 총 3개 생성되었다. 이렇게 되면 `queryFn`인 `getUser`는 **한번만** 호출되지만, `onSuccess`는 **쿼리 인스턴스 갯수만큼**, 즉 3번 실행된다. `onSuccess` 뿐만이 아니라 이렇게 지정되는 모든 옵션은 인스턴스 갯수만큼 실행된다. 따라서 `useSelector`처럼 `useCustomQuery`를 쓴다면 이 부분을 주의해야 한다.

## suspense 모드를 사용하면 쿼리가 병렬로 실행된다

> https://react-query.tanstack.com/guides/parallel-queries
> When using React Query in suspense mode, this pattern of parallelism does not work, since the first query would throw a promise internally and would suspend the component before the other queries run. To get around this, you'll either need to use the useQueries hook (which is suggested) or orchestrate your own parallelism with separate components for each useQuery instance (which is lame).

다만 실제로 react-query v3 / v4 + suspense true / false + useQuery / useQueries 다양한 조합으로 네트워크 테스트를 수행했을때 별다른 차이는 없었다.

## React Query v3의 suspense 모드는 experimental 기능이다.

리액트에서 data fetch에 따른 suspense(지연) 모드는 React 18에서 도입된 기능이고, 이전까지는 `React.lazy`를 활용한 코드 스플리팅만 지원했다. 그런데 [React Query를 사용하면](https://react-query.tanstack.com/guides/suspense) 마법처럼 이 기능을 사용할 수 있었다. 다만, React Query 문서에서 나왔듯이 이는 experimental 기능이며 React 17에서 실행하게 되면 React 18의 정식 기능과는 차이가 존재한다.

```jsx
<Suspense fallback={<Fallback />}>
  <Wrapper>
    <DataFetch />
  </Wrapper>
</Suspense>;

function Wrapper({ children }) {
  useEffect(() => {
    console.log('Wrapper');
  }, []);
  return <div>{children}</div>;
}
```

위와 같은 코드가 있고, `Wrapper`, `Fallback`, `DataFetch` 각각에 `useEffect`를 둔다면 실행 순서는 다음과 같다.

- **React 17** : Wrapper -> Fallback -> Child
- **React 18** : Fallback -> Child -> Wrapper

suspense 모드를 사용한다면 이런 차이점들을 인지해야 할 것 같다.
