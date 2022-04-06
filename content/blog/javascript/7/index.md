---
title: 'JavaScript 프로토타입 알아보기'
date: '2022-03-03T13:08:40+00:00'
description: '이 글은 JavaScript의 프로토타입에 관해 설명한다.'
tags: ['JavaScript']
thumbnail: '../thumbnail.png'
---

자바스크립트는 프로토타입 기반 언어이다. 클래스 기반 언어에서는 ‘상속’을 사용하지만 **프로토타입 기반 언어에서는 어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과**를 얻는다.

<img width="240" alt="프로토타입-도식" src="https://user-images.githubusercontent.com/47051596/156561919-3c5f4596-767b-4089-8549-2f611e778746.png">

어떤 생성자 함수를 `new` 연산자와 함께 호출하면, Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성된다. 그리고 이 인스턴스에는 `__proto__`라는 프로퍼티가 자동으로 부여되는데, 이 프로퍼티는 Constructor의 `prototype`이라는 프로퍼티를 참조한다. `__proto__`는 생략 가능한 속성이라서, 인스턴스는 Constructor.prototype의 메서드를 마치 자신의 메서드인 것처럼 호출한다. 따라서 생성자 함수의 `prototype`에 어떤 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다.

Constructor.prototype에는 `constructor`라는 프로퍼티가 있는데, 이는 다시 생성자 함수 자신을 가리킨다. 이 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지를 알고자 할 때 필요한 수단이다.

어떤 데이터의 `__proto__` 내부에 다시 `__proto__`가 연쇄적으로 이어진 것을 **프로토타입 체인**이라고 하고, 이 체인을 따라가며 검색하는 것을 **프로토타입 체이닝**이라고 한다. 프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것처럼 호출할 수 있고, 이때 접근 방식은 자신으로부터 가장 가까운 대상부터 점차 먼 대상으로 나아가며, 원하는 값을 찾으면 검색을 중단한다.

`Object.prototype`에는 모든 데이터 타입에서 사용할 수 있는 범용적인 메서드만이 존재하며, 객체 전용 메서드는 여느 데이터 타입과 달리 Object 생성자 함수에 static하게 담겨있다. 어떤 생성자 함수이든 `prototype`은 반드시 '객체'이기 때문에 `Object.prototype`이 언제나 프로토타입 체인의 최상단에 존재하게 되어, 객체에서만 사용할 메서드를 `Object.prototype` 내부에 정의한다면 다른 데이터 타입도 해당 메서드를 사용할 수 있게 되기 때문이다.

**참고**  
책 '코어 자바스크립트'에서 프로토타입 관련 내용의 요점을 정리했습니다.