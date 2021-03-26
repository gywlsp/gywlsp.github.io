---
title: '백준 1697번 숨바꼭질 - node.js'
date: '2021-03-02T01:32:08+00:00'
description: '백준 1697번 숨바꼭질을 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', '그래프', 'BFS']
thumbnail: 'boj_1697.png'
---

> 이 글은 [백준 1697번 숨바꼭질](https://www.acmicpc.net/problem/1697)을 풀이한다. 코드는 javascript로 구현하였다.

# 문제

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 **N(0 ≤ N ≤ 100,000)**에 있고, 동생은 점 **K(0 ≤ K ≤ 100,000)**에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 **X-1 또는 X+1**로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 **2\*X**의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, **수빈이가 동생을 찾을 수 있는 가장 빠른 시간**이 몇 초 후인지 구하는 프로그램을 작성하시오.

## 입력

첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

### 예제 입력 1

```bash
5 17
```

## 출력

수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

```bash
4
```

## 제한

- **시간: 2초**
- 메모리: 128MB

### 힌트

수빈이가 5-10-9-18-17 순으로 가면 4초만에 동생을 찾을 수 있다.

# 풀이

수빈이는 **1초마다 자신의 위치 X에서 X-1, X+1, 2\*X로 이동할 수 있고**, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간을 찾아야 한다. 처음에 큐에 `[수빈이의 위치, 0]`을 삽입하고, **큐(Queue)가 비기 전까지 다음 과정을 반복**하면 답을 얻을 수 있다.

- 큐에서 **원소**(위치 `pos`, 해당 위치까지 이동하는 데에 걸린 시간 `t`로 이루어짐)**를 뽑는다**.
- **pos를 이미 방문했을 때**: continue;
- **방문 안 했을 때**:
  - **pos가 동생의 위치와 같을 때**: t를 출력 후 break;
  - **아닐 때**: **다음으로 이동할 수 있는 위치 X-1, X+1, 2\*X 중 유효한 위치**(0 이상 100,000 이하)**만 그 위치와 t+1**(다음 위치까지 이동하는 데에 걸리는 시간은 1초)**을 큐에 삽입**한다.

## 구현

### 코드

```jsx
const input = [];

const strToNumArr = (str) => str.split(' ').map(Number);

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [START, END] = strToNumArr(input[0]);
    const visited = Array(100001).fill(false);

    const queue = [[START, 0]];
    while (queue.length) {
      const [pos, t] = queue.shift();
      if (visited[pos]) {
        continue;
      }

      visited[pos] = true;
      if (pos === END) {
        console.log(t);
        break;
      }

      if (pos * 2 <= 100000) {
        queue.push([pos * 2, t + 1]);
      }
      if (pos + 1 <= 100000) {
        queue.push([pos + 1, t + 1]);
      }
      if (pos - 1 >= 0) {
        queue.push([pos - 1, t + 1]);
      }
    }
  });
```
