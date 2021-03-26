---
title: '백준 1766번 문제집 - node.js'
date: '2021-03-08T04:18:47+00:00'
description: '백준 1766번 문제집을 javascript로 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', '그래프', '위상정렬', '우선순위큐']
thumbnail: 'boj_1766.png'
---

> 이 글은 [백준 1766번 문제집](https://www.acmicpc.net/problem/1766)을 풀이한다. 코드는 javascript로 구현하였다.

# 문제

민오는 1번부터 N번까지 총 N개의 문제로 되어 있는 문제집을 풀려고 한다. 문제는 난이도 순서로 출제되어 있다. 즉 **1번 문제가 가장 쉬운 문제이고 N번 문제가 가장 어려운 문제**가 된다.

어떤 문제부터 풀까 고민하면서 문제를 훑어보던 민오는, 몇몇 문제들 사이에는 '먼저 푸는 것이 좋은 문제'가 있다는 것을 알게 되었다. 예를 들어 1번 문제를 풀고 나면 4번 문제가 쉽게 풀린다거나 하는 식이다. 민오는 **다음의 세 가지 조건에 따라 문제를 풀 순서를 정하기로 하였다.**

1. **N개의 문제는 모두 풀어야 한다.**
2. **먼저 푸는 것이 좋은 문제가 있는 문제는, 먼저 푸는 것이 좋은 문제를 반드시 먼저 풀어야 한다.**
3. **가능하면 쉬운 문제부터 풀어야 한다.**

예를 들어서 네 개의 문제가 있다고 하자. 4번 문제는 2번 문제보다 먼저 푸는 것이 좋고, 3번 문제는 1번 문제보다 먼저 푸는 것이 좋다고 하자. 만일 4-3-2-1의 순서로 문제를 풀게 되면 조건 1과 조건 2를 만족한다. 하지만 조건 3을 만족하지 않는다. 4보다 3을 충분히 먼저 풀 수 있기 때문이다. 따라서 조건 3을 만족하는 문제를 풀 순서는 3-1-4-2가 된다.

**<u>문제의 개수와 먼저 푸는 것이 좋은 문제에 대한 정보가 주어졌을 때, 주어진 조건을 만족하면서 민오가 풀 문제의 순서를 결정해 주는 프로그램을 작성</u>**하시오.

## 입력

첫째 줄에 문제의 수 N(1 ≤ **N ≤ 32,000**)과 **먼저 푸는 것이 좋은 문제에 대한 정보의 개수 M(1 ≤ M ≤ 100,000)**이 주어진다. 둘째 줄부터 M개의 줄에 걸쳐 두 정수의 순서쌍 A,B가 빈칸을 사이에 두고 주어진다. 이는 A번 문제는 B번 문제보다 먼저 푸는 것이 좋다는 의미이다.

항상 문제를 모두 풀 수 있는 경우만 입력으로 주어진다.

### 예제 입력 1

```bash
4 2
4 2
3 1
```

## 출력

첫째 줄에 문제 번호를 나타내는 1 이상 N 이하의 정수들을 민오가 풀어야 하는 순서대로 빈칸을 사이에 두고 출력한다.

### 예제 출력 1

```bash
3 1 4 2
```

## 제한

- **시간: 2초**
- 메모리: 128MB

# 풀이

어떻게 주어진 일부 문제의 순서를 지키면서 쉬운 문제부터 풀 수 있을까? **<u>문제의 순서에 맞게 수를 정렬하려면 위상 정렬을 이용</u>**하면 된다. 위상 정렬 결과는 다음 과정에서 각 노드가 큐에 들어온 순서이다.

1. **진입 차수가 0인 모든 노드를 큐에 넣는다**
2. **큐가 빌 때까지 다음 과정을 반복한다.**
   1. **큐에서 원소를 꺼내 해당 노드에서 나가는 간선을 그래프에서 제거한다.**
   2. **새롭게 진입 차수가 0이 된 노드를 큐에 넣는다.**

**<u>주어진 문제 순서를 지키면서 쉬운 문제를 풀려면, 위 과정에서 큐를 우선순위 큐로 대체</u>**하면 된다. 문제의 번호가 클수록 어려운 문제이기 때문에, **<u>우선순위 큐를 최소 힙으로 구현</u>해 앞 번호(난이도가 낮은) 문제가 먼저 나오도록 구현**하면 된다. 이를 적용해 다음 과정에서 **각 노드가 우선순위 큐에 들어온 순서를 파악**하면 된다.

1. **진입 차수가 0인 모든 노드(문제)를 우선순위 큐에 넣는다**
2. **큐가 빌 때까지 다음 과정을 반복한다.**
   1. **큐에서 원소를 꺼내 해당 노드에서 나가는 간선을 그래프에서 제거한다.**
   2. **새롭게 진입 차수가 0이 된 노드를 우선순위 큐에 넣는다.**

## 구현

### 코드

```jsx
const input = [];

const strToNumArr = (str) => str.split(' ').map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLength = () => {
    return this.heap.length;
  };

  push = (node) => {
    this.heap.push(node);
    let i = this.heap.length - 1;
    let parentI = Math.floor((i - 1) / 2);
    while (i > 0 && this.heap[parentI] > this.heap[i]) {
      this.swap(i, parentI);
      i = parentI;
      parentI = Math.floor((i - 1) / 2);
    }
  };

  pop = () => {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const leftI = i * 2 + 1,
        rightI = i * 2 + 2;
      if (leftI >= this.heap.size) {
        break;
      }
      let nextI = i;
      if (this.heap[nextI] > this.heap[leftI]) {
        nextI = leftI;
      }
      if (rightI < this.heap.length && this.heap[nextI] > this.heap[rightI]) {
        nextI = rightI;
      }
      if (nextI === i) {
        break;
      }
      this.swap(i, nextI);
      i = nextI;
    }
    return result;
  };

  swap = (a, b) => {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  };
}

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [N, M] = strToNumArr(input.shift());
    const graph = [];
    const inDegrees = Array(N + 1).fill(0);
    for (let i = 0; i <= N; i++) {
      graph.push([]);
    }

    input.forEach((str) => {
      const [prev, next] = strToNumArr(str);
      graph[prev].push(next);
      inDegrees[next] += 1;
    });

    const pq = new MinHeap();
    for (let n = 1; n <= N; n++) {
      if (inDegrees[n] === 0) {
        pq.push(n);
      }
    }

    const result = [];
    while (pq.getLength()) {
      const n = pq.pop();
      result.push(n);
      graph[n].forEach((v) => {
        inDegrees[v] -= 1;
        if (!inDegrees[v]) {
          pq.push(v);
        }
      });
    }

    console.log(result.join(' '));
  });
```

### 시간 복잡도

위상 정렬 결과를 얻기 위해서는 그래프의 모든 노드를 확인하며 각 노드에서 나가는 간선을 차례대로 제거해야 한다. 따라서 위상 정렬 알고리즘의 시간 복잡도는 **O(V+E)(=O(N+M))**이다.

그러나 이 문제의 알고리즘에서는 큐가 아니라 최소 힙으로 구현된 우선순위 큐에 노드를 넣고 뺀다. **힙에서 원소를 넣고 빼는 데에 logN 시간이 소요**되기 때문에 이 알고리즘의 시간복잡도는 **O(VlogV+E)(=O(NlogN+E))**이다.
