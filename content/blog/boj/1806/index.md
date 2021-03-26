---
title: '백준 1806번 부분합 - node.js'
date: '2021-03-05T11:49:10+00:00'
description: '백준 1806번 부분합을 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', '투포인터']
thumbnail: 'boj_1806.png'
---

> 이 글은 [백준 1806번 부분합](https://www.acmicpc.net/problem/1806)을 풀이한다. 코드는 javascript로 구현하였다.

# 문제

**10,000 이하의 자연수로 이루어진 길이 N짜리 수열**이 주어진다. 이 수열에서 **<u>연속된 수들의 부분합 중에 그 합이 S 이상이 되는 것 중, 가장 짧은 것의 길이를 구하는 프로그램</u>**을 작성하시오.

## 입력

첫째 줄에 N (10 ≤ **<u>N < 100,000</u>**)과 S (0 < S ≤ 100,000,000)가 주어진다. 둘째 줄에는 수열이 주어진다. 수열의 각 원소는 공백으로 구분되어져 있으며, 10,000이하의 자연수이다.

### 예제 입력 1

```
10 15
5 1 3 5 10 7 4 9 2 8
```

## 출력

### 예제 출력 1

```
2
```

## 제한

- **시간: 0.5 초(약 5000번 연산 가능)**
- 메모리: 128 MB

# 풀이

## 접근

### 무식하게 풀 수 있을까?

이 수열에서 연속된 수들의 부분합 중에 그 합이 S 이상이 되는 것 중 가장 짧은 것의 길이를 구하는 가장 간단한 방법은, 수열에서 얻을 수 있는 **모든 연속 부분 수열의 합을 S와 비교하여 가장 짧은 길이를 갱신**하는 방법이다. 그러나 이 방법은 **O(n^2) 시간복잡도**를 가지므로 이 방법으로 수열의 최대 길이가 10만인 이 문제를 해결할 수 없다.

### 투 포인터 알고리즘

**<u>투 포인터 알고리즘</u>**은 **리스트에 순차적으로 접근해야 할 때 두 개의 점의 위치를 기록하면서 처리**하는 알고리즘이다. **시작점과 끝점 두 개의 점으로 접근할 데이터의 범위를 표현**할 수 있다. 따라서 투 포인터를 활용하여 조건에 맞는 연속부분수열의 합을 구해 **O(n) 시간복잡도**를 가지는 알고리즘을 구현했다.

## 알고리즘

**시작점(`left`)과 끝점(`right`)의 초깃값을 0**(첫 번째 원소의 인덱스)으로 설정하고, **`left`가 N 이상이 되기 전까지 다음 과정을 반복**한다.

- **현재 부분합(`left` ~ `right` 구간의 합)이 S보다 작고 `right`가 N보다 작을 때**, **`right`를 1 증가**시킨다.
- **현재 부분합이 S보다 크거나 같을 때**, **현재 구간의 길이가 기존**에 저장되어 있던 조건을 만족하는 가장 짧은 길이**보다 작을 경우 값을 갱신하고 `left`를 1 증가**시킨다.

## 구현

### 코드

```jsx
const input = [];
const INF = 987654321;
const strToNumArr = (str) => str.split(' ').map(Number);

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [N, S] = strToNumArr(input[0]);
    const numList = strToNumArr(input[1]);
    let minLen = INF;
    let intervalSum = 0,
      left = 0,
      right = 0;
    for (left; left < N; left++) {
      while (intervalSum < S && right < N) {
        intervalSum += numList[right++];
      }
      if (intervalSum >= S) {
        minLen = Math.min(minLen, right - left);
      }
      intervalSum -= numList[left];
    }
    console.log(minLen === INF ? 0 : minLen);
  });
```
