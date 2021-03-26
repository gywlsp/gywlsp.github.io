---
title: '백준 2263번 트리의 순회 - node.js'
date: '2021-03-06T14:27:58+00:00'
description: '백준 2263번 트리의 순회를 javascript로 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', '트리', '재귀']
thumbnail: 'boj_2263.png'
---

> 이 글은 [백준 2263번 트리의 순회](https://www.acmicpc.net/problem/2263)를 풀이한다. 코드는 javascript로 작성하였다.

# 문제

n개의 정점을 갖는 이진 트리의 정점에 1부터 n까지의 번호가 중복 없이 매겨져 있다. 이와 같은 **이진 트리의 인오더와 포스트오더가 주어졌을 때, 프리오더를 구하는 프로그램**을 작성하시오.

## 입력

첫째 줄에 **n(1≤n≤100,000)**이 주어진다. 다음 줄에는 인오더를 나타내는 n개의 자연수가 주어지고, 그 다음 줄에는 같은 식으로 포스트오더가 주어진다.

### 예제 입력 1

```
3
1 2 3
1 3 2
```

## 출력

첫째 줄에 프리오더를 출력한다.

### 예제 출력 1

```
2 1 3
```

## 제한

- **시간: 5초**
- 메모리: 128MB

# 풀이

## 알고리즘

이진 트리의 전위 순회, 중위 순회, 후위 순회 진행 과정은 각각 다음과 같다.

**전위 순회(preorder)**

1. 트리의 루트를 방문
2. 왼쪽 서브 트리를 전위 순회
3. 오른쪽 서브 트리를 전위 순회

중위 **순회(preorder)**

1. 왼쪽 서브 트리를 중위 순회
2. 트리의 루트를 방문
3. 오른쪽 서브 트리를 중위 순회

후위 **순회(preorder)**

1. 왼쪽 서브 트리를 후위 순회
2. 오른쪽 서브 트리를 후위 순회
3. 트리의 루트를 방문

트리의 중위, 후위 순회 결과를 이용해 어떻게 전위 순회 결과를 구할 수 있을까? 트리의 중위, 후위 순회 결과는 다음과 같이 나눌 수 있다.

- **트리의 중위 순회 결과 = <u>(왼쪽 서브 트리의 중위 순회 결과)(루트)(오른쪽 서브 트리의 중위 순회 결과)</u>**
- **트리의 후위 순회 결과 = <u>(왼쪽 서브 트리의 후위 순회 결과)(오른쪽 서브 트리의 후위 순회 결과)(루트)</u>**

이를 이용해 다음 과정으로 전위 순회 결과를 구할 수 있다.

- **<u>트리의 후위 순회 결과의 마지막 숫자</u>가 루트이므로 이를 <u>출력</u>한다.**
- **<u>왼쪽 서브트리</u>의 중위 순회 결과, 후위 순회 결과를 이용해 <u>이 과정을 반복</u>한다.**
- **<u>오른쪽 서브트리</u>의 중위 순회 결과, 후위 순회 결과를 이용해 <u>이 과정을 반복</u>한다.**

## 트러블 슈팅

**위의 알고리즘을 javascript를 이용해 재귀 호출 방식으로 구현하게 되면, 호출 스택이 넘쳐 런타임 에러가 발생할 수 있다.** 만약 노드의 개수가 10만 개이고 이진 트리의 리프를 제외한 모든 노드가 하나의 자식을 가지고 있어 그 모양이 직선과 같다면, 함수가 최대 10만 번 호출될 수 있다. 이 경우 Node.js의 call stack 최대 사이즈는 약 1만이므로 런타임 에러(Call Stack Size Exceed)가 발생한다. 따라서 **<u>반복문을 이용해 재귀 호출 방식처럼 동작하게 구현</u>**해야 한다.

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
    const N = Number(input[0]);
    const inOrderList = strToNumArr(input[1]);
    const postOrderList = strToNumArr(input[2]);
    const result = [];

    const callStack = [[0, N - 1, 0, N - 1]];
    while (callStack.length) {
      const [inStart, inEnd, postStart, postEnd] = callStack.pop();
      if (inStart > inEnd || postStart > postEnd) {
        continue;
      }
      const root = postOrderList[postEnd];
      result.push(root);
      let inRootIndex;
      for (let i = inStart; i <= inEnd; i++) {
        if (inOrderList[i] === root) {
          inRootIndex = i;
          break;
        }
      }
      const postLeftEnd = postStart + (inRootIndex - 1 - inStart);
      callStack.push([inRootIndex + 1, inEnd, postLeftEnd + 1, postEnd - 1]);
      callStack.push([inStart, inRootIndex - 1, postStart, postLeftEnd]);
    }

    console.log(result.join(' '));
  });
```
