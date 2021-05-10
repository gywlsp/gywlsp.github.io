---
title: '백준 1715번 카드 정렬하기 - node.js'
date: '2021-05-10T17:47:19+00:00'
description: '백준 1715번 카드 정렬하기을 javascript로 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', '그리디', '우선순위큐']
thumbnail: 'boj_1715.png'
---

> 이 글은 [백준 1715번 카드 정렬하기](https://www.acmicpc.net/problem/1715)을 풀이한다. 코드는 javascript로 구현하였다.

# 문제

정렬된 두 묶음의 숫자 카드가 있다고 하자. **각 묶음의 카드의 수를 A, B라 하면 보통 두 묶음을 합쳐서 하나로 만드는 데에는 A+B 번의 비교를 해야 한다.** 이를테면, 20장의 숫자 카드 묶음과 30장의 숫자 카드 묶음을 합치려면 50번의 비교가 필요하다.

매우 많은 숫자 카드 묶음이 책상 위에 놓여 있다. 이들을 두 묶음씩 골라 서로 합쳐나간다면, 고르는 순서에 따라서 비교 횟수가 매우 달라진다. 예를 들어 10장, 20장, 40장의 묶음이 있다면 10장과 20장을 합친 뒤, 합친 30장 묶음과 40장을 합친다면 (10 + 20) + (30 + 40) = 100번의 비교가 필요하다. 그러나 10장과 40장을 합친 뒤, 합친 50장 묶음과 20장을 합친다면 (10 + 40) + (50 + 20) = 120 번의 비교가 필요하므로 덜 효율적인 방법이다.

**<u>N개의 숫자 카드 묶음의 각각의 크기가 주어질 때, 최소한 몇 번의 비교가 필요한지</u>를 구하는 프로그램을 작성**하시오.

## 입력

첫째 줄에 N이 주어진다. (**<u>1 ≤ N ≤ 100,000</u>**) 이어서 N개의 줄에 걸쳐 숫자 카드 묶음의 각각의 크기가 주어진다. **숫자 카드 묶음의 크기는 1,000보다 작거나 같은 양의 정수**이다.

### 예제 입력 1

```
3
10
20
40
```

## 출력

첫째 줄에 최소 비교 횟수를 출력한다.

### 예제 출력 1

```
100
```

## 제한

- **시간: 2초**
- 메모리: 128MB

# 풀이

## 접근

문제에서 두 묶음씩 골라 합쳐나가기 때문에, 합쳐진 묶음과 또 다른 묶음을 합치게 된다. 그래서 묶음을 합쳐나가는 **각 경우마다 <u>카드의 수가 가장 적은 두 묶음을 합치면 카드들을 최소로 비교하면서 한 묶음으로 합칠 수 있다.</u>** 각 경우마다 카드의 개수가 가장 적은 두 묶음을 파악해야 하기 때문에 **<u>최소 힙</u>**을 이용하기에 적합하다. 최소 힙은 노드 삽입에 O(logn) 시간이, 삭제에 O(1) 시간이 걸리기 때문에 최소 힙을 이용해 알고리즘을 구현하면 **시간 복잡도가 O(nlogn)**이 되어 최악의 경우에도 시간 내에 답을 도출할 수 있다.

## 알고리즘

- 모든 묶음의 카드 수들을 최소 힙에 저장한다.
- 총 카드 비교 횟수를 담는 변수 `totalCompareCount`를 0으로 초기화한다.
- 최소 힙에 노드가 1개 이하가 될 때까지 다음 과정을 반복한다.
  - 최소 힙에서 노드 두 개를 꺼낸다.
  - 두 노드의 값(카드의 수)을 합쳐(=비교 횟수) `totalCompareCount`에 더한다.
  - 최소 힙에 합쳐진 묶음의 카드의 수를 삽입한다.
- `totalCompareCount`를 출력한다.

```jsx
let totalCompareCount = 0;
while (minHeap.getLength() > 1) {
  let aCount = minHeap.pop();
  let bCount = minHeap.pop();
  let compareCount = aCount + bCount;
  totalCompareCount += compareCount;
  minHeap.push(compareCount);
}
console.log(totalCompareCount);
```

## 구현

```jsx
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

const input = [];

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const minHeap = new MinHeap();
    for (let i = 1; i < input.length; i++) {
      minHeap.push(+input[i]);
    }

    let totalCompareCount = 0;
    while (minHeap.getLength() > 1) {
      let aCount = minHeap.pop();
      let bCount = minHeap.pop();
      let compareCount = aCount + bCount;
      totalCompareCount += compareCount;
      minHeap.push(compareCount);
    }
    console.log(totalCompareCount);
  });
```
