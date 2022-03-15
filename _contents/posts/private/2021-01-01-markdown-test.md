---
title: 'Markdown Test'
date: '2021-01-01T00:00:00+09:00'
excerpt: '마크다운 테스트 샘플 코드'
tags: [Markdown]
preview: '../../assets/sample.jpg'
---

# 1. Headings

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

```md
# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading
```

# 2. Line Break

스페이스 두번을  
줄 끝에 입력한다

```md
스페이스 두번을  
줄 끝에 입력한다
```

# 3. Emphasis

텍스트 **강조**

텍스트 _기울기_

~~Strikethrough~~

```md
텍스트 **강조**

텍스트 _기울기_

~~Strikethrough~~
```

# 4. Blockquote

> 이렇게
>
> > 하면됨

```md
> 이렇게
>
> > 하면됨
```

# 5. List

## Ordered List

1. 첫번째
   1. 안녕
   2. 하세요
2. 두번째
3. 세번째

```md
1. 첫번째
   1. 안녕
   2. 하세요
2. 두번째
3. 세번째
```

## Unordered List

- 첫번째
- 두번째
  - 안녕
  - 하세요
- 세번째

```md
- 첫번째
- 두번째
  - 안녕
  - 하세요
- 세번째
```

# 6. Code

## Inline Code

인라인 코드는 `이렇게`

```md
인라인 코드는 `이렇게`
```

I can highlight `css↦.some-class { background-color: red }` with CSS syntax.

```md
I can highlight `css↦.some-class { background-color: red }` with CSS syntax.
```

## Code Block

```js
// 코드블록
console.log('코드블록');
```

# 7. Image

![Minion](https://octodex.github.com/images/minion.png)
![Sample](../../assets/sample.jpg)

```md
![Minion](https://octodex.github.com/images/minion.png)
![Sample](../../assets/sample.jpg)
```

# 8. Link

[link text](https://yrnana.dev)

```md
[link text](https://yrnana.dev)
```

# 9. Embed Support

```md
https://www.youtube.com/watch?v=XJsQY2NeQi8
```

https://www.youtube.com/watch?v=XJsQY2NeQi8

```md
https://youtu.be/PEiJNyen45c
```

https://youtu.be/PEiJNyen45c

```md
https://codesandbox.io/s/floral-framework-z1xlj
```

https://codesandbox.io/s/floral-framework-z1xlj

```md
https://twitter.com/kentcdodds/status/1445103851783082002
```

<!-- https://twitter.com/kentcdodds/status/1445103851783082002 -->

```md
https://codepen.io/team/codepen/pen/PNaGbb
```

https://codepen.io/team/codepen/pen/PNaGbb

```md
https://testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a
```

https://testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a

# 10. katex

## inline

$a^2 + b^2 = c^2$

```md
$a^2 + b^2 = c^2$
```

## block

$$
a^2 + b^2 = c^2
$$

```md
$$
a^2 + b^2 = c^2
$$
```
