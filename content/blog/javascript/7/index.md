---
title: 'JavaScript 프로토타입 알아보기'
date: '2022-04-07T12:36:50+00:00'
description: '이 글은 JavaScript의 프로토타입에 대해 설명한다.'
tags: ['JavaScript']
thumbnail: '../thumbnail.png'
---

# 프로토타입

자바스크립트는 프로토타입 기반 언어이다. 클래스 기반 언어에서는 ‘상속’을 사용하지만 **프로토타입 기반 언어에서는 어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과**를 얻는다.

```javascript
var instance = new Constructor();
```

<img width="240" alt="프로토타입-도식" src="https://user-images.githubusercontent.com/47051596/156561919-3c5f4596-767b-4089-8549-2f611e778746.png">

어떤 생성자 함수(Constructor)를 `new` 연산자와 함께 호출하면, Constructor에 정의된 내용을 바탕으로 새로운 인스턴스(instance)가 생성된다. 이때 instance에는 `__proto__`라는 프로퍼티가 자동으로 부여되는데, 이 프로퍼티는 Constructor의 `prototype`이라는 프로퍼티를 참조한다. 이는 [문법 생성자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#%EB%AC%B8%EB%B2%95_%EC%83%9D%EC%84%B1%EC%9E%90%EB%A1%9C_%EA%B0%9D%EC%B2%B4_%EC%83%9D%EC%84%B1)(배열 리터럴, 객체 리터럴 등)로 객체를 생성할 때도 마찬가지다.

**prototype**은 객체이고, prototype 객체 내부에는 **인스턴스가 사용할 프로퍼티나 메서드를 저장**한다. `__proto__`는 생성자의 `prototype` 프로퍼티를 참조하기 때문에 인스턴스에서는 `__proto__`를 통해 이 메서드들에 접근할 수 있다.

예를 들어, `Person`이라는 생성자 함수의 `prototype`에 `getName`이라는 메서드를 지정했다고 해보자.

```javascript
var Person = function (name) {
  this._name = name;
};

Person.prototype.getName = function () {
  return this._name;
};
```

이때 `Person`의 인스턴스는 `__proto__`프로퍼티를 통해 `getName`을 호출할 수 있다. 왜냐하면 인스턴스의 `__proto__`가 Constructor의 `prototype` 프로퍼티를 참조하므로 결국 둘은 같은 객체를 바라보기 때문이다.

```javascript
var suzi = new Person('수지');
suzi.__proto__.getName(); // undefined
Person.prototype === suzi.__proto__; // true
```

그러나 여기에서 `this._name`이 ‘수지’가 아니라 `undefined`로 출력되었다. 그 이유는 함수를 메서드 방식으로 호출했기 때문에, `this`가 `suzi`가 아닌 `suzi.__proto__`(메서드명 바로 앞의 객체)가 되기 때문이다. 그리고 프로토타입 객체 내부에 `name` property를 추가한 것이 아니기 때문에 `undefined`가 출력된다.

`this`가 인스턴스가 되도록 하기 위해서는, `__proto__` 없이 곧바로 메서드를 쓰면 된다. `__proto__`는 생략 가능한 프로퍼티이기 때문에, `__proto__`를 생략하더라도 Constructor의 `prototype` 내부의 메서드를 자신의 메서드인 것처럼 호출할 수 있다. 평소에 JavaScript를 사용했던 개발자라면 배열을 담은 변수의 `length` 프로퍼티를 이용하거나 `concat`, `push`, `forEach` 등의 메서드를 호출해본 경험이 있을 것이다. 이것은 앞서 말했듯 `__proto__` 프로퍼티가 생략 가능하도록 설계되어있어 인스턴스가 [표준 내장 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects)의 메서드 및 속성을 자신의 것처럼 호출할 수 있었던 것이다.

# 프로토타입 체인

어떤 데이터의 `__proto__` 내부에 다시 `__proto__`가 연쇄적으로 이어진 것을 **프로토타입 체인**이라고 하고, 이 체인을 따라가며 검색하는 것을 **프로토타입 체이닝**이라고 한다. 프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것처럼 호출할 수 있고, 이때 접근 방식은 자신으로부터 가장 가까운 대상부터 점차 먼 대상으로 나아가며, 원하는 값을 찾으면 검색을 중단한다. 아래 예시에서 프로토타입 체인을 확인할 수 있다.

```javascript
var a = [1, 2];
console.dir(a);
```

<img width="300" alt="프로토타입-체인-예시" src="https://user-images.githubusercontent.com/47051596/162200498-c22170ae-127f-4298-b02e-c772ff65e6f4.png">

어떤 생성자 함수이든 `prototype`은 반드시 '객체'이기 때문에 `Object.prototype`이 언제나 프로토타입 체인의 최상단에 존재한다. 그래서 `Object.prototype`에는 모든 데이터 타입에서 사용할 수 있는 범용적인 메서드만이 존재하며, 객체 전용 메서드는 여느 데이터 타입과 달리 Object 생성자 함수에 static하게 담겨있다. 객체에서만 사용할 메서드를 `Object.prototype` 내부에 정의한다면, 다른 데이터 타입도 해당 메서드를 사용할 수 있게 되기 때문이다.

**참고 자료**

- 책 코어 자바스크립트
- [MDN 상속과 프로토타입](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN 표준 내장 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects)
