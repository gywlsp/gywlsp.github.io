---
title: 'Javascript 변수 선언 방법과 호이스팅'
date: '2021-03-17T14:05:14+00:00'
description: '이 글은 javascript에서 변수를 선언하는 방법과 호이스팅에 대해 설명한다.'
tags: ['Javascript']
thumbnail: 'javascript_1.png'
---

> 이 글은 javascript에서 변수를 선언하는 방법들과 호이스팅에 대해 설명한다. 

# 변수 선언

Javascript에는 세가지 변수 선언 방법이 있다. 세 방법을 간단하게 요약하면 다음과 같다. 

- `var`: **<u>function-scoped, globally-scoped</u> 변수를 선언하고 초깃값을 설정**할 수 있다.
- `let`: **<u>block-scoped</u> 변수를 선언하고 초깃값을 설정**할 수 있다.
- `const`: **<u>block-scoped</u> 상수를 선언하고 초깃값을 반드시 설정**해야 한다. 상수의 값을 재할당하거나 다시 선언할 수 없다.

# 변수 스코프

- **<u>globally-scoped variable</u>(전역변수)**: 전역에 선언된 변수는 어느 곳에서든지 해당 변수에 접근할 수 있다. 
- **<u>function-scoped variable</u>(지역변수)**: 함수 내에서 선언된 변수는 해당 함수 내에서만 사용할 수 있다.
- **<u>block-scoped local variable</u>**: 블록 내에서 선언된 변수는 해당 블록과 하위 블록 내에서만 사용할 수 있다.블록의 범위는 중괄호 쌍`{}`으로 구분된다. 

ES6 이전의 Javascript(var를 이용한 변수 선언)에는 블록 스코프가 존재하지 않고, 블록 내에서 선언된 변수는 블록이 있는 함수(혹은 전역 범위)에 국한된다.

# var

`var`문은 **function-scoped**(지역) 및 **globally-scoped**(전역) 변수를 선언하고 초깃값을 설정하는 데에 사용할 수 있다. 

```jsx
var a = 1;
if(a){
	var b = 2;
}

function func(){
	var c = 3;
}

console.log(a);  // 1
console.log(b);  // 2 : globally-scoped
console.log(c);  // c is not defined
```

# let

`let`문은 **mutable block-scoped 변수를 선언**한다. `var`문으로 선언된 변수는 함수 이외의 블록을 무시한다는 점에서 `let`과 다르다. 

```jsx
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 상위 블록과 같은 변수
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 상위 블록과 다른 변수
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

프로그램이나 함수의 최상위에서는 let과 var가 서로 다르게 동작한다. let은 var와 달리 전역 객체의 속성 값을 생성하지 않는다.

```jsx
var x = 'global';
let y = 'global';
console.log(this.x); // "global" 전역 객체의 속성 x를 생성
console.log(this.y); // undefined 전역 객체의 속성 y를 생성하지 않음
```

# const

`const`문은 **immutable block-scoped 상수를 선언한다. 이때 초깃값을 반드시 설정**해야 한다. 상수의 값을 재할당하거나 다시 선언할 수 없다.

```jsx
const NUMBER = 42;

try {
  NUMBER = 99;
} catch (err) {
  console.log(err);  // TypeError: invalid assignment to const `number'
}

console.log(number);  // 42
```

# 호이스팅

Javascript의 특이한 점은 **변수, 함수, 클래스 선언이 스코프 상단으로 끌어올려진다**는 점이고, 이 동작은 **<u>호이스팅</u>**이라고 불린다. Javascript 엔진은 코드를 실행하면 실행하기 직전 컴파일 단계(Just-In-Time Compilation)에서 함수와 변수 선언을 스캔하며 변수, 함수, 클래스 선언들을 **<u>Lexical Environment</u>**에 추가한다. 그래서 그들은 소스 코드에서 실제로 선언되기 전에도 참조될 수 있다.

Lexical Environment는 **식별자-변수값 쌍을 가지고 있는 자료구조**이다. 여기에서 **식별자는 변수 또는 함수의 이름**이고, **변수 값은 변수가 담고 있는 원시 값이나 오브젝트 참조(주소)**를 뜻한다. 다음은 lexical environment가 개념적으로 어떻게 구성되는지를 나타낸다.

```jsx
LexicalEnvironment = {
  Identifier: <value>,
  Identifier: <function object>
} 
```

따라서 요약하자면 **lexical environment는 <u>프로그램이 실행되는 동안 변수, 함수가 존재하는 공간</u>**이다.

## 변수 호이스팅

### var 호이스팅

```jsx
console.log(a); // undefined
var a = 3;
```

위 코드를 실행하면 3이 아니라 undefined가 출력된다. 이는 Javascript 엔진이 **<u>`var`로 선언된 변수를 찾아 선언을 lexical environment에 넣으면서 값을 `undefined`로 초기화</u>**하기 때문이다. 그후 변수가 선언된 위치에서 값을 할당한다면 그때 `undefined`가 다른 값으로 대체된다. 위 예제에서 변수 `a`에 `3`이 할당되기 전까지의 lexical environment를 나타내면 다음과 같다. 

```jsx
LexicalEnvironment = {
  a: undefined
}
```

### let, const 호이스팅

```jsx
console.log(a); //ReferenceError: a is not defined
let a = 3;
```

위 코드를 실행하면 `ReferenceError`가 발생한다. 이는 Javascript가 **<u>`let`, `const`로 선언된 변수를 선언만 끌어올리고 값을 초기화하지 않기 때문</u>**이다. Javascript 엔진은 `var`로 선언된 변수와 달리 `let`, `const`로 선언된 변수를 찾아 lexical environment에 넣으면서 값을 초기화하지 않는다. 따라서 변수 선언 위치보다 앞에서 해당 변수를 참조하면 `ReferenceError` 결과를 얻게 된다. 블록 내에서 변수 선언이 처리되기 전까지를 **<u>tdz(temporal dead zone)</u>**라고 부른다.   
`let` 변수가 선언된 위치에서도 변수에 할당한 값을 찾을 수 없을 때에는 `undefined`를 할당한다. `const` 변수의 경우 선언과 초깃값 설정이 동시에 이루어져야 하기 때문에 초깃값이 없다면 오류를 반환한다. 위 예제에서 변수 `a`에 `3`이 할당되기 전까지의 lexical environment를 나타내면 다음과 같다. 

```jsx
LexicalEnvironment = {
  a: <uninitialized>
}
```

## 함수 호이스팅

### 함수 선언 호이스팅

**함수 선언은 코드 실행 후 컴파일 단계에서 메모리에 추가**된다. 따라서 실제로 함수가 선언된 위치보다 앞에서도 함수를 실행시킬 수 있다.

```jsx
helloWorld();  // 'Hello World!'
function helloWorld(){
  console.log('Hello World!');
}
```

### 함수 표현식 호이스팅

**함수 표현식 호이스팅은 함수 선언 호이스팅과 동일하게 동작하지 않는다**. 아래 예시에서는 함수가 helloWorld 변수 안에 들어있기 때문에 var 변수 호이스팅과 똑같이 동작한다. 

```jsx
helloWorld();  // TypeError: helloWorld is not a function

var helloWorld = function(){
	console.log('Hello World!');
}
```

# var 사용을 지양하자

**<u>`var` 대신 `let`을 사용</u>하는 게 좋다.** Javascript에서는 동일한 스코프 내에서 var를 이용해 같은 이름의 변수를 여러 번 선언해도 이름이 같다면 동일한 변수를 가리킨다. 이는 수많은 버그의 원인이 될 수 있다. `let`이 블록 단위로 스코프를 지정하기 때문에 버그를 발생시킬 확률이 낮다.

다음 글들의 내용 일부를 발췌, 번역, 요약해서 글을 작성했습니다.
- [Javascript Grammar and Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types)
- [Javascript var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [Javascript let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [Javascript const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [Hoisting in Modern Javascript](https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda)