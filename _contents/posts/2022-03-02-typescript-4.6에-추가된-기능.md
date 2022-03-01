---
title: 'Typescript 4.6에 추가된 기능'
date: '2022-03-02T00:34:11+09:00'
excerpt: '타입스크립트 4.6은 더욱더 강화된 제어 흐름 분석을 제공한다.'
tags: [Typescript]
published: true
---

타입스크립트 4.4에 이어 더욱 강화된 **제어 흐름 분석 (Control Flow Analysis)** 기능이 마음에 들어서 쓰는 글으로, 이 외의 기능은 생략한다. 타입스크립트 4.6에는 이 외에도 생성자에서 `super()` 이전에 코드 사용을 허용하는 것, 향상된 재귀 깊이 검사, 인덱싱 된 액세스 추론 개선, 자바스크립트에서 좀더 많은 syntax error 및 binding error 제공 등의 기능을 추가했으니 [발표글](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)을 가볍게 읽어보면 좋을 것 같다.

## 구조분해된 판별 유니언(Discriminated Unions)에 대한 제어 흐름 분석

유니언 타입은 `number | string`과 같이 타입 여러개를 조합하여 만들 수 있는 타입이다. `판별 유니언(Discriminated Unions)`은 아래와 같이 판별 프로퍼티를 갖는 타입의 유니언이다.

```ts
// 여기에서는 `kind` 프로퍼티가 판별 기준이 된다.
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };
```

예전에 [타입스크립트 4.4](/post/2021-08-28-typescript-4.4)에서는 타입가드 함수를 선언하지 않아도 아래와 같은 구분이 가능하도록 기능이 추가되었다.

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; sideLength: number };

function area(shape: Shape): number {
  const { kind } = shape; // 1. 구조분해 가능
  const isCircle = kind === 'circle'; // 2. alias 가능
  if (isCircle) {
    // shape는 자동으로 `{ kind: "circle", radius: number }`로 인식된다.
    return Math.PI * shape.radius ** 2;
  } else {
    // shape는 자동으로 `{ kind: "square", sideLength: number }`로 인식된다.
    return shape.sideLength ** 2;
  }
}
```

그러나 아래와 같이 동일한 객체에서 구조분해된 이후에는 완전히 독립적인 것으로 간주되었었는데, 이번 4.6부터는 구조분해 된 타입이 판별 유니언인지 확인 후 판별 유니언이 맞다면 **다른 변수 값에 따라 변수 유형을 좁히게 된다.**

```ts
type Action =
  | { kind: 'NumberContents'; payload: number }
  | { kind: 'StringContents'; payload: string };

function processAction(action: Action) {
  const { kind, payload } = action;
  if (kind === 'NumberContents') {
    let num = payload * 2; // payload : number
  } else if (kind === 'StringContents') {
    const str = payload.trim(); // payload : string
  }
}
```

따라서 위와 같은 사용이 가능하다.

## 의존 매개변수에 대한 제어 흐름 분석

```ts
type Func = (...args: ['a', number] | ['b', string]) => void;

const f1: Func = (kind, payload) => {
  if (kind === 'a') {
    payload.toFixed(); // payload: number
  }
  if (kind === 'b') {
    payload.toUpperCase(); // payload: string
  }
};

f1('a', 42);
f1('b', 'hello');
```

위와 같은 코드를 작성한다면 `Func`타입 함수의 인수는 첫번째 인수에 의존하게 되고 이 경우 다른 인자의 유형을 좁힐 수 있다. 주의할 점은 반대로 `payload`의 타입을 if문으로 확인한다고 해서 `kind`의 타입이 좁혀지는 것은 아니다. 이건 위의 경우도 마찬가지로, **판별 프로퍼티로만 판별이 가능하다**는 점을 주의해야 한다.

## 참고

- https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/
