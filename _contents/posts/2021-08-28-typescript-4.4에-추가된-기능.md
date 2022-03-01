---
title: 'TypeScript 4.4에 추가된 기능'
date: '2021-08-28T14:31:28+09:00'
excerpt: '정말 좋은 기능들이 추가되어서 정리해본다.'
tags: [TypeScript]
preview: '../assets/raycast-untitled.png'
published: true
---

정말 좋은 기능들이 추가되어서 정리해본다.

## alias 된 조건문과 판별문의 제어 흐름 분석

```ts
function foo(arg: unknown) {
  if (typeof arg === 'string') {
    // arg는 string 이라는걸 인식할 수 있었음
    console.log(arg.toUpperCase());
  }
}
```

위의 케이스는 기존 타입스크립트에서도 정상적으로 인식했다. 그런데

```ts
function foo(arg: unknown) {
  const argIsString = typeof arg === 'string';
  if (argIsString) {
    console.log(arg.toUpperCase()); // !! error !! arg는 여전히 unknown으로 인식됨
  }
}
```

이렇게 `typeof arg === "string"`을 alias 하는 경우 인식을 못했었다.
그런데 타입스크립트 4.4에서는 자동으로 인식한다.

```ts
function foo(arg: unknown) {
  const argIsString = typeof arg === 'string';
  if (argIsString) {
    console.log(arg.toUpperCase()); // ts 4.4 에서는 [arg: string]으로 인식된다!
  }
}
```

원래 아래와 같은 케이스를 해결하려면 타입가드 함수를 따로 선언해야했는데 이제는 자동으로 인식한다!

```ts
type Shape =
  | { kind: "circle", radius: number }
  | { kind: "square", sideLength: number };

function area(shape: Shape): number {
  const isCircle = shape.kind === "circle";
  if (isCircle) {
    // shape는 자동으로 `{ kind: "circle", radius: number }`로 인식된다.
    return Math.PI * shape.radius ** 2;
  } else {
    // shape는 자동으로 `{ kind: "square", sideLength: number }`로 인식된다.
    return shape.sideLength ** 2;
  }
}

function area(shape: Shape): number {
  // 심지어 이렇게 구조분해를 해도 적용된다!
  const { kind } = shape;
  if (kind === "circle") {
    // shape는 자동으로 `{ kind: "circle", radius: number }`로 인식된다.
    return Math.PI * shape.radius ** 2;
  } else {
    // shape는 자동으로 `{ kind: "square", sideLength: number }`로 인식된다.
    return shape.sideLength ** 2;
  }
}
```

## 인덱스 서명에 Symbol과 Template String 패턴을 사용할 수 있음

인덱스 서명이 뭐냐면

```ts
interface Array<T> {
  [index: number]: T;
}
```

이런것이다. Array의 index는 number만 될 수 있다. 타입스크립트는 이제까지 인덱스 서명이 될 수 있는 값을 string과 number로 제한했는데 이제 Symbol과 Template String이 추가되었다.

```ts
interface Colors {
  [sym: symbol]: number;
}

const red = Symbol('red');
const green = Symbol('green');
const blue = Symbol('blue');

let colors: Colors = {};
colors[red] = 255;

interface OptionsWithDataProps {
  width?: number;
  height?: number;
  [optName: `data-${string}`]: unknown;
}

let a: OptionsWithDataProps = {
  width: 30,
  'data-blah': true,
};
```

이렇게 사용이 가능하다는 것이다.

## strict 옵션이 켜졌을 때 trycatch의 err의 기본 타입이 unknown

```ts
try {
  executeSomeThirdPartyCode();
} catch (err) {
  // 기존에는 err의 타입이 any였는데,
  // tsconfig에서 `strict: true`인 경우 err의 타입이 unknown으로 변경되었다.
  if (err instanceof Error) {
    console.error(err.message); // 이렇게 사용해야 한다
  }
}
```

`useUnknownInCatchVariables: boolean` 옵션으로 조절할 수 있다.

## Exact Optional Property Types

옵셔널한 프로퍼티의 경우 undefined로 인식을 하는데 이것이 undefined라는 값을 갖는 것인지 아니면 값이 존재하지 않는 것인지 (delete keyName) 를 명확히 해주는 옵션이 추가되었다.

```ts
interface Person {
  name: string;
  age?: number;
}

// 원래는 아래와 같이 취급되었다
interface Person {
  name: string;
  age?: number | undefined;
}

// 원래는 이렇게 사용이 가능했다.
const p: Person = {
  name: 'nana',
  age: undefined, // exactOptionalPropertyTypes 옵션이 켜진 경우 에러가 발생한다.
}

// exactOptionalPropertyTypes 옵션이 켜진 경우
const p: Person = {
  name: 'nana',
  // undefined는 정말로 키값까지 없는 것을 나타낸다.
}
```

## Class에서 static 블록 지원

```ts
class Foo {
  static count = 0;

  // static block
  static {
    Foo.count++;
  }
}
```

## inlay hint 지원

![](../assets/image-17.png)

vscode에서도 인텔리제이처럼 inlay hint를 사용할 수 있다.
vscode의 `settings.json`에 다음과 같이 세팅한다.

```json
{
  // "typescript.tsdk": "node_modules/typescript/lib",
  "javascript.inlayHints.enumMemberValues.enabled": true,
  "javascript.inlayHints.functionLikeReturnTypes.enabled": true,
  "javascript.inlayHints.parameterNames.enabled": "all",
  "javascript.inlayHints.parameterTypes.enabled": true,
  "javascript.inlayHints.propertyDeclarationTypes.enabled": true,
  "javascript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.enumMemberValues.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.variableTypes.enabled": true,
  "workbench.colorCustomizations": {
    "editorInlayHint.foreground": "#abb2bf",
    "editorInlayHint.background": "#abb2bf30"
  }
}
```

~~현재 vscode의 내장 ts 버전은 4.3.5기 때문에 4.4+를 사용하려면 패키지를 워크스페이스에 설치하고 해당 경로를 지정해야 - `typescript.tsdk` - 한다. 글로벌에 설치하고 지정해도 무방하지만, 워크스페이스에 귀속되는 것이 안전하다.~~
2021.09.03 이후 vscode의 내장 ts가 4.4로 업데이트 되어서 inlay hint를 그냥 사용할 수 있다.
inlay hint 컬러 커스텀 값을 지원하는 테마가 많지 않기 때문에 직접 지정해야 할 확률이 높다. `editorInlayHint.foreground`와 `editorInlayHint.background`는 이를 위한 설정값이다.

## 자동 import가 목록에서 실제 경로를 보여줌

![](../assets/image-18.png)
원래는 이렇게 보여줬는데

![](../assets/image-19.png)
이렇게 보여주게 되었다. 자동 import 목록 박스의 width의 한계가 있기 때문에 어떤 패키지인지 보기 편해졌다.

## 참고

- https://devblogs.microsoft.com/typescript/announcing-typescript-4-4/
