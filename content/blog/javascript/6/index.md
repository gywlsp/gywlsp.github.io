---
title: 'JavaScript 이벤트 전파와 위임'
date: '2022-02-27T08:18:20+00:00'
description: '이 글은 JavaScript의 이벤트 전파와 위임에 관해 설명한다.'
tags: ['JavaScript']
thumbnail: 'javascript_6.png'
---

# 이벤트 전파

DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. 이를 **이벤트 전파**라고 한다. 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 **이벤트 타깃**을 중심으로 DOM 트리를 통해 전파된다. 이벤트 전파는 이벤트 객체가 전파되는 방향에 따라 다음과 같이 3단계로 구분할 수 있다.

1. **캡처링 단계**(capturing phase): 이벤트가 상위 요소에서 하위 요소 방향으로 전파

2. **타깃 단계**(target phase): 이벤트가 이벤트 타깃에 도달

3. **버블링 단계**(bubbling phase): 이벤트가 하위 요소에서 상위 요소 방향으로 전파

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

li 요소를 클릭하면 클릭 이벤트가 발생하여 클릭 이벤트가 생성되고, 클릭한 li 요소가 이벤트 타깃이 된다. 이때 클릭 이벤트 객체는 window에서 시작해서 이벤트 타깃 방향으로 전파된다. 이것이 **(1)캡처링 단계**다. 이후 이벤트 객체는 이벤트를 발생시킨 이벤트 타깃에 도달한다. 이것이 **(2)타깃 단계**다. 이후 이벤트 객체는 이벤트 타깃에서 시작해서 window 방향으로 전파된다. 이것이 **(3)버블링 단계**다. 위 예제의 이벤트 핸들러는 버블링 단계의 이벤트를 캐치한다. 이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있다.

# 이벤트 위임

사용자가 li 요소를 클릭하면 해당 li에 active 클래스를 추가하고, 그 외의 모든 li 요소들에서 active 클래스를 제거하는 다음 예제를 살펴보자.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #fruits .active {
        color: red;
      }
    </style>
  </head>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById('fruits');

      // 사용자의 클릭에 의해 선택된 li 요소에 active 클래스 추가
      function activate({ target }) {
        [...$fruits.children].forEach(($fruit) => {
          $fruit.classList.toggle('active', $fruit === target);
        });
      }

      // 모든 li 요소에 이벤트 핸들러 등록
      document.getElementById('apple').onclick = activate;
      document.getElementById('banana').onclick = activate;
      document.getElementById('orange').onclick = activate;
    </script>
  </body>
</html>
```

위 예제를 살펴보면 모든 li 요소가 클릭 이벤트에 반응하도록 모든 li 요소들에 이벤트 핸들러인 activate를 등록했다. 만약 li 요소가 100개라면 100개의 이벤트 핸들러를 등록해야 한다. 이 경우 많은 DOM 요소에 이벤트 핸들러를 등록하므로, 성능 저하의 원인이 될 뿐더러 유지보수에도 부적합한 코드를 생산하게 된다.

**이벤트 위임**은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신, 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법을 말한다. ‘이벤트 전파’에서 살펴본 바와 같이, 이벤트는 상위 DOM 요소에서도 캐치할 수 있다. 이벤트 위임을 통해 상위 DOM 요소에 이벤트 핸들러를 등록하면, 여러 개의 하위 DOM 요소에 이벤트 핸들러를 등록할 필요가 없다. 또한 동적으로 하위 DOM 요소를 추가하더라도 일일이 추가된 DOM 요소에 이벤트 핸들러를 등록할 필요가 없다.

이벤트 위임을 사용하여 위 예제를 수정하면 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #fruits .active {
        color: red;
      }
    </style>
  </head>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById('fruits');

      // 사용자의 클릭에 의해 선택된 li 요소에 active 클래스 추가
      function activate({ target }) {
        // 이벤트를 발생시킨 요소(target)가 ul#fruits의 자식 요소가 아니라면 무시
        if (!target.matches('#fruits > li')) return;

        [...$fruits.children].forEach(($fruit) => {
          $fruit.classList.toggle('active', $fruit === target);
        });
      }

      // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있음
      $fruits.onclick = activate;
    </script>
  </body>
</html>
```

이벤트 위임을 통해 하위 DOM 요소에서 발생한 이벤트를 처리할 때 주의할 점은 상위 요소에 이벤트 핸들러를 등록하기 때문에 이벤트 타깃(이벤트를 실제로 발생시킨 DOM 요소)이 개발자가 기대한 DOM 요소가 아닐 수도 있다는 것이다. 위 예제의 경우 `ul#fruits` 요소에 바인딩된 이벤트 핸들러는 자기 자신은 물론 `ul#fruits` 요소의 하위 요소 중에서 클릭 이벤트를 발생시킨 모든 DOM 요소에 반응한다. 따라서 이벤트에 반응이 필요한 DOM 요소(위 예제의 경우, `#fruits > li` 선택자에 의해 선택되는 DOM 요소)에 한정하여 이벤트 핸들러가 실행되도록 이벤트 타깃을 검사할 필요가 있다.
