---
title: 'Table Of Contents using Intersection Observer API'
date: '2021-03-24T23:05:36+09:00'
excerpt: 'Table Of Contents는 목차를 의미하고, Intersection Observer API는 타겟요소가 상위요소(또는 viewport)와 Intersect 하는지 관찰하는 기능을 제공하는 Web API다.'
tags: [React, Table Of Contents, Intersection Observer API]
published: true
---

`Table Of Contents`는 목차를 의미하고, [Intersection Observer API](https://velog.io/@yrnana/Intersection-Observer-API)는 타겟요소가 상위요소(또는 viewport)와 Intersect 하는지 관찰하는 기능을 제공하는 Web API다.

구현해야 할 기능과 방법을 생각해보면

- 글에서 헤더(`h1`~`h6`)를 뽑아서 목차 목록을 생성
- `IntersectionObserver` 인스턴스를 생성하고 헤더들을 관찰하도록 함
- viewport 내에 보여지는 헤더들 중 가장 상위 헤더를 기준으로 활성화 목차를 결정
- 목차 아이템 클릭 시 헤더 위치로 이동

목차 아이템은 다음과 같은 인터페이스를 가진다.

```tsx
export interface TableOfContent {
  index: number; // key로 활용 가능한 목차 index
  text: string; // 목차 컨텐츠
  marginLeft: number; // h1이면 0px, h6이면 50px
  offsetTop: number; // 헤더의 y 위치
}
```

헤더들의 `offsetTop`을 한번만 읽고 끝내기 위해서 목차 정보에 `offsetTop`을 저장하는데, 이를 오차 없이 사용하려면 저장한 후에 내부에서 height 변동이 없어야 한다. (예를 들면 lazy loading이 되는 이미지가 있다면 Layout Shift가 발생하지 않도록 주의해야 한다)

목차는 딱 하나만 활성화 되어야 하는데, viewport 기준 가장 위의 헤더 또는 해당하는 컨텐츠의 헤더 index가 `activeIndex`가 된다. 이를 계산하기 위해 `IntersectionObserver` 인스턴스 내부에서 전달받는 entries 정보를 한번 흩어서 배열(=`intersectingList`)에 교차 여부를 저장한다. 예를 들면 이 배열에서 `intersectingList[2]`는 현재 3번째 헤더의 viewport 교차 여부를 나타내게 된다.

```ts
entries.forEach(({ target, isIntersecting }) => {
  const idx = Number((target as HTMLElement).dataset.id || 0);
  intersectingList[idx] = isIntersecting;
});
```

이후 `intersectingList`의 item 중 가장 처음으로 true가 되는 인덱스를 찾는다. 이렇게 하면 `O(2n)`으로 `activeIndex`를 찾을 수 있다. `threshold`를 `1.0`으로 지정하면 요소 전체가 보여야 true로 잡히기 때문에 위에서 찾은 index에서 1을 감하면 `activeIndex`가 된다. (이렇게 찾는 이유는 `n`번째 헤더는 보이지 않고 `n`번째 헤더의 컨텐츠만 보이더라도 `activeIndex`는 `n`이어야 하기 때문이다)

```ts
const currentIndex = intersectingList.findIndex((item) => item);
let activeIndex = currentIndex - 1;
if (currentIndex === -1) {
  activeIndex = intersectingList.length - 1; // 찾을 수 없는 경우 마지막 인덱스로 지정
} else if (currentIndex === 0) {
  activeIndex = 0; // 인덱스는 0 이상이어야 한다
}
setActiveIndex(activeIndex);
```

이 로직을 훅으로 구현하면 다음과 같다.

```ts
const useTableOfContents = () => {
  const contentRef = useRef<HTMLElement>(null);
  const intersectingListRef = useRef<boolean[]>([]); // isIntersecting array
  const [tableOfContents, setTableOfContents] = useState<TableOfContent[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intersectingList = intersectingListRef.current;
    const content = contentRef.current!;
    const headers = content.querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, h5, h6',
    ); // all headers

    // set TableOfContents
    const tocData = Array.from(headers).map<TableOfContent>((header, i) => ({
      index: i,
      text: header.textContent || '',
      marginLeft: (Number(header.tagName.charAt(1)) - 1) * 10,
      offsetTop: header.offsetTop + 2, // have to down little bit
    }));
    setTableOfContents(tocData);

    // create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // save isIntersecting info to array using data-id
        entries.forEach(({ target, isIntersecting }) => {
          const idx = Number((target as HTMLElement).dataset.id || 0);
          intersectingList[idx] = isIntersecting;
        });
        // get activeIndex
        const currentIndex = intersectingList.findIndex((item) => item);
        let activeIndex = currentIndex - 1;
        if (currentIndex === -1) {
          activeIndex = intersectingList.length - 1;
        } else if (currentIndex === 0) {
          activeIndex = 0;
        }
        setActiveIndex(activeIndex);
      },
      { threshold: 1 },
    );

    headers.forEach((header, i) => {
      header.setAttribute('data-id', i.toString()); // set data-id
      intersectingList.push(false); // increase array length
      observer.observe(header); // register to observe
    });

    return () => {
      observer.disconnect();
      intersectingList.length = 0; // empty array
    };
  }, []);

  return {
    contentRef,
    tableOfContents,
    activeIndex,
  };
};
```

이 훅을 사용한 목차를 구현했더니 뭔가 삐걱삐걱..

https://codesandbox.io/s/tableofcontents-using-intersection-observer-api-in-react-0jcox
