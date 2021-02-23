---
title: '백준 5639번 이진검색트리 - node.js'
date: '2021-02-21T07:02:53+00:00'
description: '백준 5639번 이진검색트리를 javascript로 풀이하는 글입니다.'
tags: ['Javascript', 'Algorithm']
thumbnail: 'boj_5639.png'
---
> 이 글은 [백준 5639 이진검색트리](https://www.acmicpc.net/problem/5639)를 풀이한다. 알고리즘은 javascript로 구현하였다.

# 문제

이진 검색 트리는 다음과 같은 세 가지 조건을 만족하는 이진 트리이다.

- 노드의 왼쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 작다.
- 노드의 오른쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 크다.
- 왼쪽, 오른쪽 서브트리도 이진 검색 트리이다.

![https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/upload/images/bsearchtree.png](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/upload/images/bsearchtree.png)

전위 순회 (루트-왼쪽-오른쪽)은 루트를 방문하고, 왼쪽 서브트리, 오른쪽 서브 트리를 순서대로 방문하면서 노드의 키를 출력한다. 후위 순회 (왼쪽-오른쪽-루트)는 왼쪽 서브트리, 오른쪽 서브트리, 루트 노드 순서대로 키를 출력한다. 예를 들어, 위의 이진 검색 트리의 전위 순회 결과는 50 30 24 5 28 45 98 52 60 이고, 후위 순회 결과는 5 28 24 45 30 60 52 98 50 이다.

**이진 검색 트리를 전위 순회한 결과가 주어졌을 때, 이 트리를 후위 순회한 결과를 구하는 프로그램을 작성**하시오.

## 입력

트리를 전위 순회한 결과가 주어진다. 노드에 들어있는 키의 값은 10^6보다 작은 양의 정수이다. 모든 값은 한 줄에 하나씩 주어지며, **노드의 수는 10,000개 이하**이다. 같은 키를 가지는 노드는 없다.

### 예제 입력 1

```bash
50
30
24
5
28
45
98
52
60
```

## 출력

입력으로 주어진 이진 검색 트리를 후위 순회한 결과를 한 줄에 하나씩 출력한다.

### 예제 출력 1

```bash
5
28
24
45
30
60
52
98
50
```

# 풀이

이진 검색 트리의 정의에 따라, 루트의 왼쪽 서브 트리는 루트보다 작은 노드들로만 이루어져 있고, 루트의 오른쪽 서브 트리는 루트보다 큰 노드들로만 이루어져 있다.

그리고 전위 순회는 다음과 같은 방법으로 트리를 순회한다.

1. 노드를 방문한다
2. 왼쪽 서브 트리를 전위 순회한다.
3. 오른쪽 서브 트리를 전위 순회한다.

따라서 트리를 전위 순회 결과(숫자들)를 다음과 같이 나눌 수 있다.

```
(루트)(왼쪽 서브트리를 구성하는 노드들)(오른쪽 서브트리를 구성하는 노드들)
= (루트)(루트보다 작은 노드들)(루트보다 큰 노드들)
```
    

**트리 전위 순회 결과를 후위 순회 결과로 바꾸기 위해 어떻게 해야 할까?**

후위 순회는 다음과 같은 방법으로 트리를 순회한다. 

1. 왼쪽 서브 트리를 후위 순회한다.
2. 오른쪽 서브 트리를 후위 순회한다. 
3. 노드를 방문한다.

따라서 다음 과정을 반복하면 된다.

1. **트리 전위 순회 결과를 루트, 왼쪽 서브트리, 오른쪽 서브트리로 나눈다,**
2. **왼쪽 서브 트리에 대해 이 과정을 반복한다.**
3. **오른쪽 서브 트리에 대해 이 과정을 반복한다.**
4. **루트를 방문한다.** 

## 트러블 슈팅

처음에 이 문제를 재귀로 풀었는데 제출했을 때 호출 스택이 터져 **런타임 에러(StackSizeExceeded**)가 발생했다. 백준에서 javascript로 된 코드를 제출하면 이런 경우가 꽤 있다.

그래서 **스택을 이용해 코드가 재귀 호출과 비슷하게 동작하도록 구현**했다.

## 구현

### 코드

```jsx
const input = [];
const stack = [];
const result = [];

require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", function (line) {
    input.push(Number(line.trim()));
  })
  .on("close", function () {
    //전위 순회 결과 배열의 시작, 끝 인덱스 삽입
    stack.push([0, input.length - 1]);
    while (stack.length) {
      const [start, end] = stack.pop();
      if (start > end) {
        continue;
      }

      //루트보다 큰 숫자들 중 가장 앞 숫자가 오른쪽 서브트리의 루트
      let pivot;
      for (let i = start + 1; i <= end; i++) {
        if (input[i] < input[start]) {
          continue;
        }
        pivot = i;
        break;
      }

      //오른쪽 서브트리가 존재할 때
      if (pivot) {
        //왼쪽 서브트리의 시작, 끝 인덱스 삽입
        stack.push([start + 1, pivot - 1]);
        //오른쪽 서브트리의 시작, 끝 인덱스 삽입
        stack.push([pivot, end]);
      } else {
        //루트 제외한 나머지 숫자들 삽입
        stack.push([start + 1, end]);
      }
      //result 배열의 처음에 루트 삽입
      //while문에서 이 과정 반복하면 후위 순회 결과 완성
      result.unshift(input[start]);
    }
    console.log(result.join("\n"));
  });
```