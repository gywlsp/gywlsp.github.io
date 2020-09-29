---
title: '백준 10815번 숫자 카드 - javascript :: 사이다 데브로그'
date: '2020-09-29T14:05:02+00:00'
description: '백준 10815번 문제 숫자 카드를 javascript로 풀이하는 글입니다.'
tags: ['Javascript', 'Algorithm', 'Binary Search']
thumbnail: 'boj_10815.png'
---

이 글은 [백준 10815번 숫자 카드](https://www.acmicpc.net/problem/10815)를 풀이한다.  
코드는 javascript로 작성하였다.

# 문제 파악

- 상근이는 정수 하나가 적혀있는 숫자 카드 N개를 가지고 있다.
- 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.

### 입력

- **첫째 줄**에 상근이가 가지고 있는 **숫자 카드의 개수 N(1 ≤ N ≤ <u>500,000</u>)**이 주어진다.
- **둘째 줄**에는 **숫자 카드에 적혀있는 정수**가 주어진다. 숫자 카드에 적혀있는 수는 **-10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다**. 두 숫자 카드에 **같은 수가 적혀있는 경우는 없다.**
- 셋째 줄에는 **M(1 ≤ M ≤ <u>500,000</u>)**이 주어진다.
- 넷째 줄에는 **상근이가 가지고 있는 숫자 카드인지 아닌지를 구해야 할 M개의 정수**가 주어지며, 이 수는 공백으로 구분되어져 있다. 이 수도 **-10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다**.

### 출력

- 첫째 줄에 입력으로 주어진 M개의 수에 대해서, **각 수가 적힌 숫자 카드를 <u>상근이가 가지고 있으면 1을, 아니면 0을</u> 공백으로 구분해 출력**한다.

### 시간 제한

- **<u>2초</u>**

### 메모리 제한

- 256MB

# 문제 풀이

## 접근

상근이가 가지고 있는 숫자 카드인지 아닌지를 구해야 할 정수들을, 상근이가 가지고 있는 **<u>첫 번째 숫자부터 탐색하여 구한다고 가정</u>**해보자.

상근이가 가지고 있는 숫자 카드의 개수 N의 최댓값은 500,000이고, 상근이가 가지고 있는 숫자 카드인지 아닌지를 구해야 할 정수의 개수 M의 최댓값은 500,000이다. 첫 번째 숫자부터 탐색하면, **<u>최악의 경우 2500억(500,000\*500,000)번 비교 연산</u>**을 해야 한다. (N은 카드에 같은 수가 적혀있는 경우가 없다고 명시되어 있지만, M은 그런 말이 없다.)

문제의 **시간 제한이 2초이기 때문에 최대 2억 번 정도 연산을 할 수 있는데**, 최악의 경우 2500억 번의 연산을 하게 되기 때문에 **제한 시간을 초과**한다. 그래서 **<u>비교 연산을 더 적게 하는 방법</u>**을 이용해야 한다.

**숫자들을 상근이가 가지고 있는지**를 알아내면 되기 때문에, 입력으로 주어진 **<u>상근이가 가지고 있는 정수들의 순서를 바꾸어도 상관이 없다</u>**. 그래서 상근이가 가지고 있는 정수들을 **<u>오름차순으로 정렬한 후, 이진 탐색</u>을 이용**해서 숫자의 유무를 판별했다.

## 알고리즘

1. **상근이가 가지고 있는 정수들의 순서를 오름차순으로** 정렬한다.
2. **답을 구해야 하는 정수들을 첫 번째 수부터 이진 탐색을 이용해 상근이가 가지고 있는 정수들에 포함되어 있는지 알아낸다**. **포함되어 있으면 1, 아니면 0을 결과 문자열에 더한다.**
3. **결과 문자열을 출력**한다.

## 참고

### 메모리 초과

처음에 **_`binarySearch`_ 함수**를 만들 때 매개변수로 받은 배열을 [javascript slice 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)를 이용해 **배열을 slice하여 매개변수로 넘겼다**.  
그러나 slice 메서드는 매개변수로 들어온 인덱스를 파악해 얕은 **복사본을 새로운 배열 객체로 반환**하기 때문에, slice를 할 때마다 해당 객체가 **<u>메모리 공간을 차지</u>**하게 된다.  
그래서 메모리 초과 오류가 났었는데, 배열을 잘라서 넘기는 방법이 아닌 **<u>배열의 시작, 끝 인덱스를 넘기는 방식으로 함수를 리팩토링</u>**하여 해당 문제를 해결했다.

## 구현

```javascript
//https://www.acmicpc.net/problem/10815

const input = [];
let numList = undefined;

const strToNumArr = (str) => str.split(' ').map((numChar) => Number(numChar));

//이진 탐색
const binarySearch = (num, startIndex, endIndex) => {
  if (endIndex < startIndex) return false;
  if (endIndex === startIndex) return num === numList[startIndex];

  const pivotIndex = Math.floor((endIndex + startIndex) / 2);
  if (num === numList[pivotIndex]) return true;
  else if (num > numList[pivotIndex])
    return binarySearch(num, pivotIndex + 1, endIndex);
  else if (num < numList[pivotIndex])
    return binarySearch(num, startIndex, pivotIndex - 1);
};

//입력 받기
require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const numListFinalIndex = Number(input[0]) - 1; //상근이가 가지고 있는 숫자 카드들을 담는 배열의 가장 마지막 인덱스를 저장
    numList = strToNumArr(input[1]).sort((a, b) => a - b); //상근이가 가지고 있는 숫자 카드들을 오름차순으로 정렬
    const searchNumList = strToNumArr(input[3]); //검사해야 하는 숫자카드들

    //결과 문자열 연산
    const result = searchNumList.reduce(
      (acc, curr) =>
        (acc += `${binarySearch(curr, 0, numListFinalIndex) ? 1 : 0} `),
      ''
    );
    console.log(result);
  });
```
