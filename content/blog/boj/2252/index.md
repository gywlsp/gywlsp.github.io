---
title: '백준 2252번 줄 세우기 - node.js'
date: '2021-03-08T03:39:34+00:00'
description: '백준 2252번 줄 세우기를 javascript로 풀이하는 글입니다.'
tags: ['백준', 'Javascript', '그래프', '위상정렬']
thumbnail: 'boj_2252.png'
---

> 이 글은 [백준 2252번 줄 세우기](https://www.acmicpc.net/problem/2252)를 풀이한다. 코드는 javascript로 구현하였다.

# 문제

**N명의 학생들을 키 순서대로 줄을 세우려고 한다**. 각 학생의 키를 직접 재서 정렬하면 간단하겠지만, 마땅한 방법이 없어서 **두 학생의 키를 비교하는 방법을 사용**하기로 하였다. 그나마도 모든 학생들을 다 비교해 본 것이 아니고, 일부 학생들의 키만을 비교해 보았다.

**<u>일부 학생들의 키를 비교한 결과가 주어졌을 때, 줄을 세우는 프로그램을 작성</u>**하시오.

## 입력

첫째 줄에 N(1≤**<u>N≤32,000</u>**), M(1≤**<u>M≤100,000</u>**)이 주어진다. **M은 키를 비교한 회수**이다. 다음 M개의 줄에는 키를 비교한 두 학생의 번호 A, B가 주어진다. 이는 학생 A가 학생 B의 앞에 서야 한다는 의미이다.

**학생들의 번호는 1번부터 N번**이다.

### 예제 입력 1

```bash
3 2
1 3
2 3
```

## 출력

첫째 줄부터 앞에서부터 줄을 세운 결과를 출력한다. 답이 여러 가지인 경우에는 아무거나 출력한다.

### 예제 출력 1

```bash
1 2 3
```

## 제한

- 시간: 2초
- 메모리: 128MB

# 풀이

이 문제는 선수과목을 고려한 학습 순서 결정 문제와 유사하다. 해당 문제는 위상 정렬을 이용하는 대표적인 예시이다. 따라서 이 문제도 **<u>위상 정렬을 이용</u>**해 답을 구할 수 있다.

### 위상 정렬

위상 정렬이란, **사이클이 없는 방향 그래프의 모든 노드를 방향성에 거스르지 않도록 순서대로 나열**하는 것을 의미한다. 다음 과정에서 **<u>각 노드가 큐에 들어온 순서가 곧 위상 정렬을 수행한 결과</u>**이다.

1. **진입 차수가 0인 모든 노드를 큐에 넣는다**
2. **큐가 빌 때까지 다음 과정을 반복한다.**
   1. **큐에서 원소를 꺼내 해당 노드에서 나가는 간선을 그래프에서 제거한다.**
   2. **새롭게 진입 차수가 0이 된 노드를 큐에 넣는다.**

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
    const [N, M] = strToNumArr(input.shift());
    const graph = [];
    for (let i = 0; i <= N; i++) {
      graph.push([]);
    }
    const inDegrees = Array(N + 1).fill(0);

    input.forEach((str) => {
      const [prev, next] = strToNumArr(str);
      graph[prev].push(next);
      inDegrees[next] += 1;
    });

    const queue = [];
    for (let n = 1; n <= N; n++) {
      if (!inDegrees[n]) {
        queue.push(n);
      }
    }

    const result = [];
    while (queue.length) {
      const n = queue.pop();
      result.push(n);
      graph[n].forEach((v) => {
        inDegrees[v] -= 1;
        if (!inDegrees[v]) {
          queue.push(v);
        }
      });
    }

    console.log(result.join(' '));
  });
```

### 시간 복잡도

위상 정렬 결과를 얻기 위해 그래프의 모든 노드를 확인하며 각 노드에서 나가는 간선을 차례대로 제거해야 한다. 따라서 위상 정렬 알고리즘의 시간 복잡도는 **O(V+E)(=O(N+M))**이다.
