---
title: '백준 1026번 보물 - javascript :: 사이다 데브로그'
date: '2020-09-30T09:52:22+00:00'
description: '백준 1026번 문제 보물을 javascript로 풀이하는 글입니다.'
tags: ['Javascript', 'Algorithm']
thumbnail: 'boj_1026.png'
---

이 글은 [백준 1026번 보물](https://www.acmicpc.net/problem/1026)을 풀이한다.  
코드는 javascript로 작성하였다.

# 문제 파악

- 길이가 N인 정수 배열 A와 B가 있다.
- S = A[0]\*B[0] + ... + A[N-1]\*B[N-1]
- S의 값을 가장 작게 만들기 위해 A의 수를 재배열하자. 단 B에 있는 수는 재배열하면 안 된다.
- **S의 최솟값을 출력**하는 프로그램을 작성하시오.

### 입력

- **첫째 줄**에 **N**이 주어진다.
- **둘째 줄**에는 **A에 있는 N개의 수**가 순서대로 주어진다.
- **셋째 줄**에는 **B에 있는 수**가 순서대로 주어진다.
- **N은 50보다 작거나 같은 자연수**이다.
- A와 B의 각 원소는 100보다 작거나 같은 음이 아닌 정수이다.

**예제 입력**

```powershell
5
1 1 1 6 0
2 7 8 3 1
```

### 출력

- 첫째 줄에 S의 최솟값을 출력한다.

**예제 출력**

```powershell
18
```

### 시간 제한

- 2초

### 메모리 제한

- 128MB

# 문제 풀이

## 접근

**S의 최솟값을 출력**해야 한다. S(A[0]\*B[0] + ... + A[N-1]\*B[N-1])가 최솟값이 되려면 **<u>A 배열의 작은 수는 B 배열의 큰 수와 곱</u>**하고, **<u>A 배열의 큰 수는 B 배열의 작은 수와 곱</u>**해서 출력하면 된다. 큰 수는 큰 수끼리, 작은 수는 작은 수끼리 곱해서 더하면 결과값이 커지기 때문이다.

## 알고리즘

1. **A** 배열의 수들을 **오름차순으로 정렬**한다.
2. **B** 배열의 수들을 **내림차순으로 정렬**한다.
3. **S**(A[0]\*B[0] + ... + A[N-1]\*B[N-1])값을 계산한 후 **출력**한다.

## 참고

### B 배열 요소들의 순서

문제에 A를 재배열하고 **B에 있는 수는 재배열하면 안 된다고 명시**되어 있으나, **채점기는 <u>예제를 입력했을 때 올바른 출력 값이 나오는지를 검사</u>**한다. 따라서 B에 있는 수들의 순서를 바꾸더라도 S의 최솟값을 올바르게 출력하면 된다.

### javascript sort 메서드

[javascript sort 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)를 이용해 배열의 요소들을 정렬할 때, **매개변수에 정렬 순서를 정의하는 함수를 넣어주지 않으면** sort 메서드는 각 요소 문자열의 **<u>유니 코드 값</u>에 따라 배열의 요소들을 정렬**한다.

따라서 **배열의 정수들을 오름차순, 또는 내림차순으로 정렬하고 싶다면 정렬 순서를 정의하는 함수를 매개변수로 넣어주어야 한다.**

## 구현

```jsx
//https://www.acmicpc.net/problem/1026

let input = [];

const strToNumArr = (str) => str.split(' ').map((numChar) => Number(numChar));

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const A = strToNumArr(input[1]).sort((a, b) => a - b); //오름차순 정렬
    const B = strToNumArr(input[2]).sort((a, b) => b - a); //내림차순 정렬
    //reduce 메서드를 이용해 결과값 계산
    const result = A.reduce((acc, curr, index) => {
      return acc + curr * B[index];
    }, 0);
    console.log(result);
  });
```
