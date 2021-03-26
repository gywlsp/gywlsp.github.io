---
title: 'React에서 논리 연산자로 조건부 렌더링할 때의 주의사항'
date: '2020-11-29T11:53:53+00:00'
description: '이 글은 React, React Native에서 논리 연산자로 조건부 렌더링할 때 주의사항에 대해 설명하는 글입니다.'
tags: ['React', 'ReactNative']
thumbnail: 'guide_1.png'
---

> **이 글은 React, React Native에서 논리 연산자로 조건부 렌더링할 때 주의사항에 대해 설명한다.**

JSX 안에는 중괄호를 이용해서 표현식을 포함할 수 있다.

그 안에 **JavaScript의 논리 연산자 `&&`를 사용하면 다른 방법보다 쉽고 간결하게 엘리먼트를 조건부로 넣을 수 있다.**

JavaScript에서 **`true && expression`**은 항상 **`expression`**으로 평가되고, **`false && expression`**은 항상 **`false`**로 평가된다.

따라서 **`&&` 뒤의 엘리먼트는 조건이 `true`일 때 출력**이 된다. 조건이 `false`라면 React는 무시한다.

**조건이 false일 때 주의**해야 할 점이 있다. 아래 예제를 통해 이를 살펴보자.

**`ProductCard`** 컴포넌트는 부모로부터 받은 **`imgSrc`(상품 이미지 url)**과 **`name`(상품 이름)**을 받아 렌더링한다.

props에 **`likeCount`(좋아요 수)가 존재한다면 이 또한 렌더링**한다.

**리액트 예시**

```tsx
import React from 'react';

export type ProductCardProps = {
  imgSrc: string;
  name: string;
  likeCount?: number;
};

export default function ProductCard({
  imgSrc,
  name,
  likeCount,
}: ProductCardProps) {
  return (
    <div>
      <img src={imgSrc} alt={imgSrc} />
      <p>{name}</p>
      {likeCount && <p>{likeCount}</p>}
    </div>
  );
}
```

**리액트 네이티브 예시**

```tsx
import React from 'react';

export type ProductCardProps = {
  imageSource: string;
  name: string;
  likeCount: number;
};

export default function ProductCard({
  imageSource,
  name,
  likeCount,
}: ProductCardProps) {
  return (
    <View>
      <Image source={imageSource} />
      <Text>{name}</Text>
      {likeCount && <Text>{likeCount}</Text>}
    </View>
  );
}
```

그러나 이 코드에서 고려하지 않은 부분이 있다.

**`0`은 `false`로 간주**되기 때문에, **`likeCount`가 `0`일 때 `&&` 뒤의 표현식이 반환되지 않고 `0`이 반환**된다.

따라서 `likeCount`가 존재하지만 그 값이 `0`이라면 `<p/>`, `<Text/>` **태그 안에 감싸서 렌더링되지 않는다**.

이 경우 **몇 가지 문제점**이 생길 수 있다.

- **React Native**에서는 **문자를 렌더링하고 싶다면 무조건** `<Text/>` **태그 안에 넣어야** 하는데, 위의 경우 `<Text/>` 태그 없이 `0`이 반환되어 앱이 이를 **에러로 간주**한다.
- `<p/>`, `<Text/>`에 따로 스타일링을 해놓았다면 해당 **스타일이 적용되지 않은 채 `likeCount`가 렌더링** 될 것이다.

따라서 **`&&` 연산자의 조건이 false로 간주되는 값일 경우 해당 값이 반환된다는 것에 주의**해야 한다.

위의 예제 코드의 `&&` 앞을 아래와 같이 바꿔주면 원하는 대로 컴포넌트가 렌더링된다.

**리액트 예시**

```tsx
import React from 'react';

export type ProductCardProps = {
  imgSrc: string;
  name: string;
  likeCount?: number;
};

export default function ProductCard({
  imgSrc,
  name,
  likeCount,
}: ProductCardProps) {
  return (
    <div>
      <img src={imgSrc} alt={imgSrc} />
      <p>{name}</p>
      {likeCount >= 0 && <p>{likeCount}</p>}
    </div>
  );
}
```

**리액트 네이티브 예시**

```tsx
import React from 'react';

export type ProductCardProps = {
  imageSource: string;
  name: string;
  likeCount: number;
};

export default function ProductCard({
  imageSource,
  name,
  likeCount,
}: ProductCardProps) {
  return (
    <View>
      <Image source={imageSource} />
      <Text>{name}</Text>
      {likeCount >= 0 && <Text>{likeCount}</Text>}
    </View>
  );
}
```
