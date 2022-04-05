---
title: 'React hooks(1) - useState, useEffect'
date: '2021-05-08T13:09:47+00:00'
description: '이 글은 React의 대표적인 hook useState, useEffect에 대해 설명한다.'
tags: ['React']
thumbnail: '../thumbnail.png'
---

> **이 글은 React의 대표적인 hook useState, useEffect에 대해 설명한다.**

# Hook이란?

Hook은 **<u>함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)를 연동(hook into)할 수 있게 해주는 함수</u>**이다. Hook은 class 안에서는 동작하지 않는다.

React는 `useState`, `useEffect`같은 내장 Hook을 몇 가지 제공한다.

# useState - state hook

**`useState` hook을 이용하면 <u>함수 컴포넌트 내에서 state를 사용</u>할 수 있다.** 과거에 함수 컴포넌트는 stateless했지만, `useState`가 등장한 이후 함수 컴포넌트 안에서도 React state를 사용할 수 있게 되었다.

**사용 예시**

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

# useEffect - effect hook

**`useEffect` hook을 이용하여 우리는 <u>함수 컴포넌트에게 렌더링 직후에 어떤 일을 수행해야 할지 알려줄 수 있다</u>.** React는 우리가 넘긴 함수(=**<u>effect</u>**)를 기억했다가 DOM 업데이트를 수행한 이후에 불러낸다.

**사용 예시**

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

`useEffect`를 사용하면 함수 컴포넌트 안에서 렌더링 이후에 다양한 **<u>side effect</u>**를 수행할 수 있다. Side effect에는 데이터 가져오기, 구독(subscription) 설정하기, 수동으로 React 컴포넌트의 DOM을 수정하기 등이 있다.

## effect 정리(Clean-up)

네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 따로 정리(Clean-up)가 필요 없다. 그러나 정리가 필요한 경우도 있는데, 외부 데이터에 구독을 설정해야 하는 경우가 이에 해당한다. 이 경우에는 메모리 누수가 발생하지 않도록 effect를 정리하는 것이 매우 중요하다.

**<u>effect 정리가 필요한 경우</u>**에는 다음과 같이 **<u>정리 함수를 반환</u>**하면 된다. React는 **컴포넌트가 마운트 해제되고 제거되기 직전에 정리를 실행**한다. 하지만 effect는 모든 렌더링에서 실행되기 때문에 **다음 차례의 effect를 실행하기 전에도 이전 렌더링에서 파생된 effect를 정리**한다.

**사용 예시**

```jsx
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

## effect 수행 시기

**`useEffect` hook을 이용하여 우리는 <u>함수 컴포넌트 내에서 생명주기 기능을 사용</u>할 수 있다.** `useEffect`의 등장 이후 클래스의 생명주기 메서드 중 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`의 기능을 함수 컴포넌트에서도 구현할 수 있게 되었다.

- `componentDidMount`: 마운트(첫 번째 렌더링) 직후에 effect 실행
- `componentDidUpdate`: 리렌더 직후에 effect 실행
- `componentWillUnmount`: 마운트 해제되어 제거되기 직전에 effect 정리

**`useEffect`에 주어진 effect는 기본적으로 모든 렌더링(마운팅, 리렌더링) 직후에 실행**된다. 그리고 **정리 함수가 있을 때에는 정리가 다음 렌더링 직전과 언마운트 후 컴포넌트가 제거되기 직전에 수행된다.**

그러나 모든 렌더링 이후에 effect를 정리하거나 적용하는 것이 때때로 성능 저하를 발생시킬 수 있다. 이런 경우에는 **`useEffect`의 두 번째 인자로 적절한 값을 주어 effect의 수행, 정리 시기를 조절**할 수 있다.

- effect를 실행하고 정리(clean-up)하는 과정을 **마운트와 마운트 해제 시에 한 번씩만 실행하고 싶은 경우**

  → 두 번째 인자로 `[]` 전달

  **예시**

```jsx
useEffect(() => {
  document.title = 'hi';
}, []);
```

- effect를 실행하고 정리(clean-up)하는 과정을 **마운트와 마운트 해제 시, 그리고 리렌더링 후 특정 변수(들)의 값이 바뀐 경우에만 실행하고 싶은 경우**

  → 두 번째 인자로 **배열에 원하는 변수(들)** 넣어 전달

  **예시**

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

이 최적화 방법을 사용한다면 배열이 컴포넌트 범위 내에서 바뀌는 값들과 effect에 의해 사용되는 값들을 모두 포함해야 한다. 그렇지 않으면 현재 값이 아니라 이전 렌더링 때의 값을 참고하게 된다.

## 생명주기 메서드 vs useEffect

class의 생명 주기 메서드를 이용하면 각 생명주기 메서드에 자주 관련 없는 로직이 섞여들어가곤 한다. 예시로 `componentDidMount` 와 `componentDidUpdate`는 컴포넌트안에서 데이터를 가져오는 작업을 수행할 때 사용 되어야 하지만, 같은 `componentDidMount`에 이벤트 리스너를 설정하는 것과 같은 관계없는 로직이 포함되기도 하며, `componentWillUnmount`에서 cleanup 로직을 수행하기도 한다. 이때 함께 변경되는 상호 관련 코드는 분리되지만 이와 연관 없는 코드들은 단일 메서드로 결합된다. 이로 인해 버그가 쉽게 발생하고 무결성을 너무나 쉽게 해치게 된다.

위와 같은 예시에서, 상태 관련 로직은 한 공간안에 묶여 있기 때문에 이런 컴포넌트들을 작게 분리하는 것은 불가능하며 테스트하기도 어렵다. 이 때문에 많은 사용자들은 React를 별도의 상태 관리 라이브러리와 함께 결합해서 사용해왔다. 그러나, 이런 상태 관리 라이브러리는 종종 너무 많은 추상화를 하고, 서로 다른 파일들 사이에서 건너뛰기를 요구하며 컴포넌트 재사용을 더욱더 어렵게 만들었다.

이같은 문제를 해결하기위해, 컴포넌트를 생명주기 메서드를 기반으로 쪼개기보다는, **Hook을 이용하며 컴포넌트를 비슷한 기능이 묶여있는 작은 함수로 나누는 게 좋다.**

\*React 공식 문서를 바탕으로 작성한 글입니다.
