---
title: '백준 1463번 1로 만들기 - node.js'
date: '2020-12-03T09:29:53+00:00'
description: '백준 1463번 1로 만들기를 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', 'DP']
thumbnail: 'boj_1463.png'
---

# 문제 파악

### 문제

정수 X에 사용할 수 있는 연산은 다음과 같이 세 가지 이다.

1. X가 3으로 나누어 떨어지면, 3으로 나눈다.
2. X가 2로 나누어 떨어지면, 2로 나눈다.
3. 1을 뺀다.

정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다. **<u>연산을 사용하는 횟수의 최솟값을 출력</u>**하시오.

### 입력

첫째 줄에 **1보다 크거나 같고, 10^6보다 작거나 같은 정수 N**이 주어진다.

**예제 입력**

```
10
```

### 출력

첫째 줄에 **연산을 하는 횟수의 최솟값**을 출력한다.

**예제 출력**

```
3
```

### 제한

- **시간 제한 : 2초**(대략 2억 번 연산 가능)
- **메모리 제한** : 128MB

# 문제 풀이

## 접근

정수 X는 그 값에 따라 최소 1가지, 최대 3가지 연산을 할 수 있다.

정수 X를 1로 만드는 최소 연산 횟수는,

**<u>(가능한 연산을 통해 얻을 수 있는 이전 숫자들을 1로 만드는 최소 연산 횟수들 중 가장 작은 값) + 1(앞에서 한 연산)</u>**이다.

**이전 숫자들을 1로 만드는 최소 연산 횟수들을 참고**해야 하기 때문에, **작은 수부터** 1로 만드는 최소 연산 횟수를 **구하고 이를 저장**해두었다.

## 알고리즘

- **2부터 N까지 순서대로 각 숫자를 1로 만드는 최소 연산 횟수를 구하고 이를 저장**한다.

  - 어떤 수든 1을 뺄 수 있으므로, 연산을 통해 얻을 수 있는 이전 숫자 배열에 (숫자-1)을 넣는다.
  - 숫자를 2로 나눌 수 있으면 위 배열에 (숫자/2)를 넣는다.
  - 숫자를 3으로 나눌 수 있으면 위 배열에 (숫자/3)을 넣는다.
  - **배열의 값들을 각각 1로 만드는 최소 연산 횟수 중 최솟값을 구하고**,

    **여기에 1을 더해 현재 숫자를 1로 만드는 최소 연산 횟수를 구한다**. 그리고 이를 **저장**한다.

## 구현

```jsx
//https://www.acmicpc.net/problem/1463

const input = [];
let memo;

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    //N 받기
    const N = Number(input[0]);
    //memo[n]에는 n을 1로 만드는 최소 연산 횟수를 저장
    memo = [...Array(N + 1)];
    //초기값 설정
    memo[1] = 0;

    //2부터 N까지 연산 수행
    for (let n = 2; n <= N; i++) {
      //1을 빼는 연산은 어떤 수든 가능
      prevNumbers = [n - 1];
      //2로 나누어 떨어지면 2로 나누는 연산 가능
      if (n % 2 === 0) {
        prevNumbers.push(n / 2);
      }
      //3으로 나누어 떨어지면 3으로 나누는 연산 가능
      if (n % 3 === 0) {
        prevNumbers.push(n / 3);
      }

      //n을 1로 만드는 최소 연산 횟수는
      //(이전 수가 될 수 있는 숫자들을 1로 만드는 최소 연산 횟수들 중 작은 값) + 1
      memo[n] = Math.min(...prevNumbers.map((num) => memo[num])) + 1;
    }

    //N을 1로 만드는 최소 연산 횟수 출력
    console.log(memo[N]);
  });
```
