---
title: '왜 React 컴포넌트/엘리먼트 리스트 항목에 적절한 key를 부여해야 할까?'
date: '2022-04-05T12:44:11+00:00'
description: '이 글은 React 컴포넌트/엘리먼트 리스트에서 key의 역할에 대해 설명한다.'
tags: ['React']
thumbnail: '../thumbnail.png'
---

**Key**는 React 컴포넌트나 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트이다. Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 **식별**하는 것을 돕는다. 배열 내부의 엘리먼트나 컴포넌트에 안정적인 고유성을 부여하기 위해 key를 지정해야 한다.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

Key를 선택하는 가장 좋은 방법은 **리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열**을 사용하는 것이다. 대부분의 경우 데이터의 ID를 key로 사용한다.

```jsx
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

렌더링한 항목에 대한 고유한 값이 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있다. 그리고 리스트 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용한다. 그러나 항목의 순서가 바뀔 수 있는 경우, 인덱스를 key로 사용하는 것은 권장되지 않는다. 이로 인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있다.

React는 key를 통해 기존 DOM 트리와 이후 트리의 자식들이 일치하는지 확인한다. React는 key를 기반으로 컴포넌트 인스턴스를 갱신하고 재사용한다. 인덱스를 key로 사용하면, 항목의 순서가 바뀌었을 때 key 또한 바뀔 것이다. 그 결과로, 컴포넌트의 state가 엉망이 되거나 의도하지 않은 방식대로 바뀔 수도 있다.

그래서 **key는 반드시 유일하고, 변하지 않으며 예상 가능해야** 한다. 이때 key는 리스트 항목들 사이에서만 고유한 값이면 된다. 만약 변하는 key(Math.random()으로 생성된 값 등)를 사용하면 많은 컴포넌트 인스턴스와 DOM 노드를 불필요하게 재생성하여 성능이 나빠지거나 컴포넌트의 state가 유실될 수 있어 주의해야 한다.

**참고 자료**

- [https://ko.reactjs.org/docs/lists-and-keys.html](https://ko.reactjs.org/docs/lists-and-keys.html)
- [https://ko.reactjs.org/docs/reconciliation.html#keys](https://ko.reactjs.org/docs/reconciliation.html#keys)
