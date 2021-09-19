---
title: 'Code Block'
date: '2021-09-19T11:06:23+09:00'
published: true
---

```ts
class MyClass {
  public static myValue: string;
  constructor(init: string) {
    this.myValue = init;
  }
}
import fs = require("fs");
module MyModule {
  export interface MyInterface extends Other {
    myProperty: any;
  }
}
declare magicNumber number;
myArray.forEach(() => { }); // fat arrow syntax
```

```md
# Heading h1

## Heading h2

**hello**
```

```js
const value = 0;
```

```sh
# shell
npm run dev
```

```tsx
const Header: React.VFC = () => {
  return (
    <header className="flex flex-row items-center my-4 sm:my-8">
      <div className="mr-auto">
        <Link href="/">
          <a className="text-2xl font-semibold font-mono hover:text-purple-500">
            nana.log
          </a>
        </Link>
      </div>
      <nav className="flex flex-row items-center space-x-4">
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/archive">Archive</ActiveLink>
        <ActiveLink href="/tags">Tags</ActiveLink>
      </nav>
    </header>
  );
};
```

```scss
.test {
  .hello {
    color: red;
  }
}
```
