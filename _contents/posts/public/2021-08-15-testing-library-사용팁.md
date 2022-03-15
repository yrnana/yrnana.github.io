---
title: 'testing-library 사용팁'
date: '2021-08-15T12:29:37+09:00'
excerpt: '요점은 사용자 관점에서 테스트를 작성하자는 것이다.'
tags: [test, Testing Library]
---

리액트로 개발하다보면 테스트는 거의 `jest` + `testing-library` 조합을 깔고 가는 듯 하다. `CRA`도 이 조합으로 기본적으로 세팅되어서 나온다. 가장 최근 [State of JS](https://2020.stateofjs.com/en-US/technologies/testing/) 테스팅 툴 부문에서도 `testing-library`가 만족도 랭킹 1위를 기록했다.

`testing-library`는 리액트에 국한된 테스팅 툴은 아니고, `DOM Testing Library`라는 코어 패키지가 존재하고 뷰나 앵귤러 등 여러 프레임워크에 적용할 수 있도록 별도 패키지로 제공되고 있다.

## 테스트 속도 vs 신뢰도

https://twitter.com/kentcdodds/status/1349211410442579968

먼저 짚고 넘어가고 싶은 부분이다. 물론 테스트코드를 **잘못** 짜서 느리게 실행된다면 문제가 될 수 있다. (불필요한 쿼리 실행 등) 하지만 정상적인 테스트코드가 단지 느리다는 이유로 쿼리를 바꿔야만 할까?

### testing-library의 쿼리 우선순위와 쿼리 성능 비교

`testing-library`의 [쿼리 우선순위(Priority)](https://testing-library.com/docs/queries/about#priority)와 쿼리 성능 때문에 가끔 고민이 될 때가 있다.
`testing-library`는 유저 인터랙트와 가장 유사하게 테스트를 짜는 것을 권장한다.

```tsx
<button className="submit-button" data-testid="submit-button-testid">
  등록
</button>
```

이렇게 생긴 버튼이 있다고 치면, 화면을 보는 사용자는 이 버튼의 `className`이 `submit-button`인지 `data-testid`가 `submit-button-testid` 인지 알고 누르는게 아니다. 그냥 `등록` 이라고 적힌 `버튼`이라 누르는거다.

각각의 테스트에 대한 쿼리를 적어보면 아래와 같다.

```ts
document.querySelector('.submit-button'); // jsdom에서도 querySelector를 사용할 수 있다.
screen.getByTestId('submit-button-testid');
screen.getbyRole('button', { name: /등록/ });
```

쿼리 우선순위는 당연히 `getByRole`이 가장 높다. 그렇다면 뭐가 문제인가 하면 쿼리 속도 차이가 엄청나게 크다는 것이다. 이 버튼 하나만 만들어서 codesandbox에서 테스트를 돌려보니 각각 2ms, 2ms, 11ms를 기록했다. 화면이 복잡할수록, 테스트가 많을 수록 이 차이는 엄청난 차이를 만들어낼것이다.

`testing-library` 레포에서도 `getByRole`의 성능 문제는 단골 이슈다.
https://github.com/testing-library/dom-testing-library/issues/820
https://github.com/testing-library/dom-testing-library/issues/552

### 쿼리 우선순위를 우선시 해야하는 이유

그냥 빠른 `getByTestId`를 쓰면 안되나? 라고 할 수 있는데 여기에는 맹점이 있다. 예를 들면 나는 사용자에게 `등록`이라는 버튼을 제공하려고 했는데 실수로 `등럭`이라고 작성할 수도 있다. 그런데 `data-testid`를 사용하는 쿼리 셀렉팅에는 전혀 문제가 발생하지 않는다.

이건 다른 얘긴데 `className` 유무로 스타일을 테스트 하는 것도 문제점이 존재한다. 예를 들면 노란색 버튼을 클릭하면 `active`라는 `className`이 붙고 빨간색 버튼으로 바뀌는 토글 버튼이 있다고 가정하자.

```tsx
import './ToggleButton.scss';

const ToggleButton = () => {
  const [active, setActive] = useState(false);
  return (
    <button
      className={active ? 'toggle-button active' : 'toggle-button'}
      onClick={() => setActive((state) => !state)}
    >
      토글
    </button>
  );
};
```

```scss
.toggle-button {
  background: yellow;
  &.active {
    background: red;
  }
}
```

```tsx
describe('토글버튼 테스트', () => {
  it('초기에는 노랑색이다.', () => {
    render(<ToggleButton />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('active');
  });

  it('클릭하면 빨강색이다.', () => {
    render(<ToggleButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveClass('active');
  });
});
```

이 테스트 자체는 아무런 문제도 없다. 그런데 만약 `scss`에서 `background`를 `yellow`에서 `blue`로 변경한다면? 그래도 정상동작하는게 문제다. 이 점에서 css-in-js로 스타일을 주입하고 테스트하는게 더 정확하긴 하다. (물론 이건 예시고 컬러값, 픽셀값까지 테스트하는건 좀 아닌 듯함)

쿼리 우선순위에 대해 말하다보니 빙 돌아왔는데, 요점은 **사용자 관점에서 테스트를 작성하자**는 것이다.

### 쿼리 우선순위를 지키면서 신뢰도 높은 테스트코드를 작성하는 방법

- `html(jsx)`을 잘 작성한다
  `html`이 프로그래밍 언어가 아니라는 유머에 웃을때가 아님👻👻
- [testing-playground.com](https://testing-playground.com)에서 테스트 쿼리에 익숙해지자
  - [chrome extension](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano)도 있다

## react-testing-library 사용시 자주하는 실수

> 원문
> https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

몇가지 핵심이라고 생각하는 부분만 가져오고 사견을 붙였는데, 원문을 읽는 것을 추천한다.

### 가정문 올바르게 쓰기

```ts
const button = screen.getByRole('button');

expect(button.disabled).toBe(true); // ❌
expect(button).toBeDisabled(); // ✅
```

`jest-dom`이 제공하는 [matchers](https://github.com/testing-library/jest-dom#custom-matchers)들을 활용하는 것을 강추한다. 결과 자체는 동일하지만 실패할 경우 오류 메시지가 다르다.

### 불필요한 act 사용 🙅‍♀️

```ts
act(() => fireEvent.click(button)); // ❌
fireEvent.click(button); // ✅
```

개발자들이 act warning 메시지를 볼 때마다 이런 식으로 `act`로 감싸려고 하는데 `render`나 `fireEvent`는 이미 act로 래핑된 함수라 무의미한 행동이다. 워닝 메시지가 발생한다면 테스트가 종료된 후 상태 변경이 일어난 것 이므로 이에 대한 코드 수정이 필요하다.

### 쿼리를 올바르게 쓰기

#### \*ByRole를 더 활용하기

```ts
// <button><span>hello</span><span>world</span></button>
screen.getByText(/hello world/i); // ❌
screen.getByRole('button', { name: /hello world/i }); // ✅
```

위와 같은 형태의 버튼도 쿼리가 가능하다는 장점이 있다.

#### 접근성 role를 불필요하게 등록하지 않기

```html
<button role="button">Click me</button> // ❌ <button>Click me</button> // ✅
```

button은 `button`이라는 `role`을 가진 요소이므로 등록이 불필요하다. 이와 같이 테스트를 한답시고 함부로 `role`을 명명하고 등록하면 안된다. 우선 [접근성](https://developer.mozilla.org/en-US/docs/Web/Accessibility)에 대한 충분한 학습이 필요하다.

#### waitFor 내에서 사이드 이펙트 수행하지 말기

```ts
await waitFor(() => {
  fireEvent.click(button) // ❌
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

fireEvent.click(button)  // ✅
await waitFor(() => {
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})
```

`waitFor`는 수행한 작업으로 인해 가정문이 통과되는 사이에 시간이 걸리는 항목을 위한 것인데, 콜백은 몇번이고 실행될 수 있기 때문에 내부에 side-effect를 작성하면 안된다.

## 참고

- https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- https://testing-library.com/docs/queries/about#priority
