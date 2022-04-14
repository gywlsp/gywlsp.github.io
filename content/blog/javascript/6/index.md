---
title: 'JavaScript 이벤트 전파와 위임'
date: '2022-04-14T22:43:03+00:00'
description: '이 글은 JavaScript의 이벤트 전파와 위임에 관해 설명한다.'
tags: ['JavaScript']
thumbnail: '../thumbnail.png'
---

# 이벤트 전파

DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. 이를 **이벤트 전파**라고 한다. 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 **이벤트 타깃**을 중심으로 DOM 트리를 통해 전파된다. 이벤트 전파는 이벤트 객체가 전파되는 방향에 따라 다음과 같이 3단계로 구분할 수 있다.

1. **캡처링 단계**(capturing phase): 이벤트가 상위 요소에서 하위 요소(이벤트 타깃) 방향으로 전파

2. **타깃 단계**(target phase): 이벤트가 이벤트 타깃에 도달

3. **버블링 단계**(bubbling phase): 이벤트가 하위 요소(이벤트 타깃)에서 상위 요소 방향으로 전파

다음 예제와 같이 ul 요소에 이벤트 핸들러를 바인딩하고, ul 요소의 하위 요소인 li 요소를 클릭하여 이벤트를 발생시켜 보자.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById('fruits');

      // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
      $fruits.addEventListener('click', (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
      });
    </script>
  </body>
</html>
```

li 요소를 클릭하면 클릭 이벤트가 발생하여 클릭 이벤트가 생성되고, 클릭한 li 요소가 **이벤트 타깃**이 된다. 이때 클릭 이벤트 객체는 window에서 시작해서 이벤트 타깃 방향으로 전파된다. 이것이 **(1)캡처링 단계**다. 이후 이벤트 객체는 이벤트를 발생시킨 이벤트 타깃에 도달한다. 이것이 **(2)타깃 단계**다. 이후 이벤트 객체는 이벤트 타깃에서 시작해서 window 방향으로 전파된다. 이것이 **(3)버블링 단계**다. 위 예제의 이벤트 핸들러는 버블링 단계의 이벤트를 캐치한다. 이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있다.

## 이벤트 전파 방지

Event 인터페이스의 [`stopPropagation()`](https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation) 메서드는 이벤트가 캡처링/버블링 단계에서 더 이상 전파되지 않도록 방지한다. 이 메서드를 이용해 이벤트 전파를 방지할 수 있다.

# 이벤트 위임

**이벤트 위임**은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신, 하나의 상위 DOM 요소에 이벤트 핸들러를 등록해 상위 요소에서 하위 요소의 이벤트를 제어하는 방법을 말한다. ‘이벤트 전파’에서 살펴본 바와 같이, 이벤트는 상위 DOM 요소에서도 캐치할 수 있다. 이벤트 위임을 통해 상위 DOM 요소에 이벤트 핸들러를 등록하면, 여러 개의 하위 DOM 요소에 이벤트 핸들러를 등록할 필요가 없다. 또한 동적으로 하위 DOM 요소를 추가하더라도 일일이 추가된 DOM 요소에 이벤트 핸들러를 등록할 필요가 없다는 장점이 있다.

## event target과 event current target

[이벤트 타깃](https://developer.mozilla.org/ko/docs/Web/API/Event/target)은 이벤트가 발생한 요소를 가리킨다. 반면 [이벤트 커런트 타깃](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)은 이벤트 핸들러가 연결된 요소를 가리킨다. 이벤트를 위임하면, 이벤트 타깃과 이벤트 커런트 타깃이 각각 다른 요소를 가리키게 된다. 만약 상위 요소 A에 하위 요소 B의 이벤트를 위임하고 B에서 이벤트를 발생시키면, 이벤트 타깃은 B, 이벤트 커런트 타깃은 A가 된다.

**참고**

- 책 모던 자바스크립트 Deep Dive
- https://developer.mozilla.org/ko/docs/Web/API/Event
