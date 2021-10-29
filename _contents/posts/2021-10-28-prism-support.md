---
title: 'prism support'
date: '2021-10-28T06:00:48+09:00'
published: true
---

## Inline `Code`

인라인 `코드`입니다.

인라인 `css↦.some-class { background-color: red }`코드입니다.

## Line Number

```js{numberLines: 5}
// In your gatsby-config.js
function logBoxHeight() {
  box.style.height = '200px';
  console.log(box.offsetHeight);
}
```

## Line Highlight

```js{2-3}
// In your gatsby-config.js
function logBoxHeight() {
  box.style.height = '200px';
  console.log(box.offsetHeight);
}
```

```ts
let lastScrollY = 0; // highlight-line
let ticking = false;

const changeBoxWidth = (y: number) => {
  // highlight-next-line
  box.style.width = y + 100 + 'px';
};

const listener = () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    // highlight-start
    window.requestAnimationFrame(() => {
      changeBoxWidth(lastScrollY);
      ticking = false;
    });
    // highlight-end
    ticking = true;
  }
};

window.addEventListener('scroll', listener);
```

## Markup

### Empty tag

```html
<p></p>
```

### Name-Attribute Pair

```html
<button type="submit" disabled>버튼</button>
```

### DOCTYPE

```html
<!DOCTYPE html>
<html></html>
```

### Comment

```html
<!-- I'm a comment -->
```

### Entities

```html
&amp; &#x2665; &#160; &#x152;
```

### Full HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>I can haz embedded CSS and JS</title>
    <style>
      @media print {
        p {
          color: red !important;
        }
      }
    </style>
  </head>
  <body>
    <p checked class="title" id="title">Title</p>
    <!-- here goes the rest of the page -->
    <script>
      if (true) {
        console.log('foo');
      }
    </script>
  </body>
</html>
```

## CSS

## Simple Rule

```css
#id {
  color: blue;
  --heading-1: 30px/32px Helvetica, sans-serif;
}
p.class {
  color: red;
  line-height: normal !important;
}
input[type='text'] {
  background: none;
}
```

### @ rule

```css
@import url(print.css);
@media screen and (min-width: 100px) {
}
```

### Comment

```css
/* comment */
```

### URL

```css
div::before {
  content: url('Chunkfive.otf');
}
```

### CSS Pseudo

```css
li:last-child {
  color: red;
}
```

## SCSS

### Comment

```scss
// comment
```

### At Rules

```scss
@import 'foo.scss';

@mixin container {
  max-width: 980px;
}

@mixin button($color: green) {
  @if ($color == green) {
    background-color: #008000;
  } @else if ($color == red) {
    background-color: #b22222;
  }
}

@for $i from 1 through 3 {
  @include button(red);
}
```

### Variables

```scss
$width: 5em;
#main {
  width: $width;
}
```

### Property

```scss
p.#{$name} {
  #{$attr}-color: blue;
}
```

## Markdown

```md
# H1 Heading

## H2 Heading

you can write text [with links](http://example.com) inline or [link references][1].

- one _thing_ has *em*phasis
- two **things** are **bold**

[1]: http://example.com

---

<this_is inline="xml"></this_is>

> markdown is so cool

    so are code segments

1. one thing (yeah!)
2. two thing `i can write code`, and `more` wipee!

~~Strikethrough~~
```

## Javascript

### Variable Assignment

```js
const foo = 'bar';
const hello = 3;
```

### Operators

```js
const result = ((1 + 2 * 3) / 4 >= 3 && 4 < 5) || 6 > 7;
```

### Indented Code

```js
if (true) {
  while (true) {
    doSomething();
  }
}
```

### Regex

```js
const foo = /([^/])\/(\\?.|\[.+?])+?\/[gim]{0,3}/g;
```

### Link in comment

```js
// http://lea.verou.me
/* http://lea.verou.me */
```

### Nested Strings

```js
const bar = 'He "said" \'hi\'!';
```

### ES6

```js
import { foo as bar } from 'file';

const x = 0;
const ts = `Only on ${x} one line`;
```

## JS Docs

```jsdoc
/**
 * Trims the given string.
 *
 * @param {string} [str=""] the string.
 * @returns {string} the trimmed string.
 * @throws {TypeError} if the argument is not a string.
 * @example trim(" hello ")
 */
function trim(str = "") {
	if (typeof str != "string") {
		throw new TypeError("str has to be a string");
	}
	return str.trim();
}
```

## JSX

```jsx
import React from 'react';

const App = ({ children }) => {
  const [num, setNum] = useState(0);
  return (
    <div
      style={{
        color: 'red',
      }}
    >
      <Child number={num} />
      {children}
    </div>
  );
};
```

## Typescript

```typescript
class MyClass {
  public static staticValue: string;
  instanceValue: string;

  constructor(value: string) {
    this.instanceValue = value;
  }
}

import fs = require('fs');

export interface MyInterface extends MyClass {
  myProperty: any;
}

const name: number = 333;
```

## TSX

```tsx
const PostListItem: React.VFC<PostListItemFragment> = ({
  slug,
  excerptAst,
  frontmatter,
}) => {
  const { date, title, tags, excerptAst: frontmatterExcerptAst } = frontmatter!;

  return (
    <div>
      <Link to={slug} className="hover:text-purple-500">
        <h2 className="text-xl font-medium">{title}</h2>
      </Link>
      <div className="text-gray-500 mt-2">{formatDate(date)}</div>
      <div className="mt-2 excerpt-markdown">
        {renderAst(frontmatterExcerptAst || excerptAst)}
      </div>
      {tags && (
        <div className="flex flex-row flex-wrap space-x-3 mt-3">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} color="purple" />
          ))}
        </div>
      )}
    </div>
  );
};
```

## JSON

```json
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": { "text": "...", "sensitive": false }
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": { "text": "...", "sensitive": false }
  }
]
```

## Bash

```bash
#!/bin/bash

#### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}

echo '"quoted"' | tr -d \" > text.txt
```

## Shell

```sh-session
$ echo $EDITOR # comment
vim
$ git checkout main
Switched to branch 'main'
Your branch is up-to-date with 'origin/main'.
$ git push
Everything up-to-date
$ echo 'All
> done!'
All
done!
```

```shell{promptUser: root}{promptHost: localhost}
echo $EDITOR # comment
```

```shell{promptUser: ec2-user}{promptHost: amazon.com}
echo $EDITOR # comment
```

## HTTP

### Request Header

```http
GET http://localhost:9999/foo.html HTTP/1.1
Accept-Language: fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
```

### Response Header

```http
HTTP/1.1 200 OK
Server: GitHub.com
Date: Mon, 22 Dec 2014 18:25:30 GMT
Content-Type: text/html; charset=utf-8
```

## GraphQL

### Keywords

```graphql
query withFragments {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
    mutualFriends(first: 10) {
      ...friendFields
    }
  }
}

fragment friendFields on User {
  id
  name
  profilePic(size: 50)
}
```

### Descriptions

```graphql
"""
This is a multiline description
# Heading
[Prism](http://www.prismjs.com)

It can contain **Markdown
	on multiple lines**
"""
type Example {
  id: ID!
}

type Sample {
  """
  Simple multiline description
  """
  name("This is a single line description" first: Int): String
}
```
