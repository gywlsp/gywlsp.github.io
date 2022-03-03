---
title: 'JavaScript의 실행 컨텍스트'
date: '2022-02-27T01:50:11+00:00'
description: '이 글은 JavaScript의 실행 컨텍스트에 관해 설명한다.'
tags: ['JavaScript']
thumbnail: '../thumbnail.png'
---

# 실행 컨텍스트란?

- **실행 컨텍스트**는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다.

- 실행 컨텍스트는 전역 공간에서 자동으로 생성되는 전역 컨텍스트와 eval 및 함수 실행에 의한 컨텍스트 등이 있다.

- 실행 컨텍스트 객체는 활성화되는 시점에 다음 세 가지 정보를 수집한다.

  1. **VariableEnvironment**

  2. **LexicalEnvironment**

  3. **ThisBinding**

## VariableEnvironment와 LexicalEnvironment

- 실행 컨텍스트를 생성할 때는 VariableEnvironment와 LexicalEnvironment가 동일한 내용의 다음 두 가지 정보로 구성된다.

  1. **EnvironmentRecord**

     : 매개변수명, 변수의 식별자, 선언한 함수의 함수명 등을 수집

  2. **OuterEnvironmentReference**

     : 바로 직전 컨텍스트의 LexicalEnvironment 정보를 참조

- **LexicalEnvironment**는 함수 실행 도중에 변경되는 사항이 즉시 반영되는 반면 **VariableEnvironment**는 초기 상태를 유지한다.

### EnvironmentRecord와 호이스팅

- **호이스팅**은 ‘끌어올리다’라는 의미의 동명사로, environmentRecord 수집 과정을 추상화한 개념이다.

  +) 자바스크립트 엔진이 environmentRecord를 수집하는 시기는, 실행 컨텍스트가 활성화되는 시점이다. 그렇기 때문에 자바스크립트는 코드를 실행하기 전에 이미 해당 환경에 속한 식별자들을 알고 있게 된다.

  +) 이를 식별자들을 최상단으로 끌어올려놓은 다음 실제 코드를 실행한다고 이해하기 쉽게 추상화한 개념이 호이스팅이다.

- 변수 선언과 값 할당이 동시에 이뤄진 문장은 ‘선언부’만을 호이스팅하고, 할당 과정은 원래 자리에 남아있게 되는데, 여기서 함수 선언문과 함수 표현식의 차이가 발생한다.

  💡 **함수 선언문과 함수 표현식**

  - 함수 선언문: function의 정의부만 존재하고 별도의 할당 명령이 없는 것
    → 전체를 호이스팅
  - 함수 표현식: 정의한 function을 별도의 변수에 할당하는 것
    → 변수 선언부만 호이스팅

### OuterEnvironmentReference와 스코프, 스코프 체인

- **스코프**는 식별자에 대한 유효 범위이다.

  +) 어떤 경계 A의 외부에서 선언한 변수는 A의 외부뿐 아니라 내부에서도 접근 가능하지만, A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근할 수 있다.

- **스코프 체인**은 스코프를 안에서부터 바깥으로 검색해나가는 것을 의미하고, 이를 가능하게 하는 것이 OuterEnvironmentReference이다.

  +) 예를 들어 A 함수 내부에 B 함수를 선언하고 다시 B 함수 내부에 C 함수를 선언한 경우, 함수 C의 OuterEnvironmentReference는 함수 B의 LexicalEnvironment를 참조한다. 함수 B의 LexicalEnvironment에 있는 OuterEnvironmentReference는 다시 함수 B가 선언되던 때(A)의 LexicalEnvironment를 참조한다. 이처럼 OuterEnvironmentReference는 연결 리스트 형태를 띤다.

  - 여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에게만 접근 가능하다.

    +) 각 OuterEnvironmentReference는 오직 자신이 선언된 시점의 LexicalEnvironment만 참조하고 있으므로, 가장 가까운 요소부터 차례대로만 접근할 수 있다.

## ThisBinding

- 실행 컨텍스트의 thisBinding은 this로 지정된 객체가 저장된다.

- 실행 컨텍스트 활성화 당시에 this가 지정되지 않은 경우 this에는 전역 객체가 저장된다.

- 그 밖에는 함수를 호출하는 방법에 따라 this에 저장되는 대상이 다르다.

### 상황에 따라 달라지는 this

- **전역공간**
  → 전역 객체(브라우저-window, Node.js-global)를 참조한다.

- **어떤 함수를 메서드로서 호출한 경우**
  → 호출 주체(메서드명 앞의 객체)를 참조한다.

- **어떤 함수를 함수로서 호출한 경우**
  → 전역 객체를 참조한다.

- **콜백함수 내부**
  → 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따른다.
  → 정의하지 않은 경우 전역 객체를 참조한다.

- **생성자 함수**
  → 생성될 인스턴스를 참조한다.

### 명시적 this 바인딩

- **call, apply 메서드**
  : this를 명시적으로 지정하면서 함수/메서드를 호출한다.

- **bind 메서드**
  : this 및 함수에 넘길 인수를 일부 지정해 새로운 함수를 만든다.
- 요소를 순회하며 콜백함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자를 this로 받기도 한다.

### 화살표 함수

- ES6에서 도입된 화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다. 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가 정의된 위치에 따라 결정된다는 것을 의미한다.

  💡 **렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.**

  - 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.
