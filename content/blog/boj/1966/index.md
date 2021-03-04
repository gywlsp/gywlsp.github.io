---
title: '백준 1966번 프린터 큐 - node.js'
date: '2020-11-25T09:04:00+00:00'
description: '백준 1966번 프린터 큐를 풀이하는 글입니다.'
tags: ['백준','Javascript', '큐']
thumbnail: 'boj_1966.png'
---

이 글은 백준 1966번 [프린터 큐](https://www.acmicpc.net/problem/1966)를 풀이한다.

알고리즘은 javascript를 이용해 구현했다.

# 문제 파악

### 문제

여러분도 알다시피 여러분의 프린터 기기는 여러분이 인쇄하고자 하는 문서를 인쇄 명령을 받은 ‘순서대로’, 즉 먼저 요청된 것을 먼저 인쇄한다. 여러 개의 문서가 쌓인다면 Queue 자료구조에 쌓여서 FIFO - First In First Out - 에 따라 인쇄가 되게 된다. 하지만 상근이는 새로운 프린터기 내부 소프트웨어를 개발하였는데, 이 **프린터기는 다음과 같은 조건에 따라 인쇄**를 하게 된다.

1. **현재 Queue의 가장 앞에 있는 문서의 ‘중요도’를 확인**한다.
2. **나머지 문서들 중 현재 문서보다 중요도가 높은 문서가 하나라도 있다면**, 이 문서를 인쇄하지 않고 Queue의 가장 뒤에 **재배치**한다. **그렇지 않다면 바로 인쇄**를 한다.

예를 들어 Queue에 4개의 문서(A B C D)가 있고, 중요도가 2 1 4 3 라면 C를 인쇄하고, 다음으로 D를 인쇄하고 A, B를 인쇄하게 된다.

여러분이 할 일은, **<u>현재 Queue에 있는 문서의 수와 중요도가 주어졌을 때**, **어떤 한 문서가 몇 번째로 인쇄되는지 알아내</u>**는 것이다. 예를 들어 위의 예에서 C문서는 1번째로, A문서는 3번째로 인쇄되게 된다.

### 입력

**첫 줄에 test case의 수**가 주어진다.

**각 test case에 대해**서 문서의 수 **N(100이하)**와 **몇 번째로 인쇄되었는지 궁금한 문서가 현재 Queue의 어떤 위치에 있는지를 알려주는 M(0이상 N미만)**이 주어진다.

**다음줄에 N개 문서의 중요도**가 주어지는데, 중요도는 1 이상 9 이하이다. **중요도가 같은 문서가 여러 개 있을 수도** 있다. 위의 예는 N=4, M=0(A문서가 궁금하다면), 중요도는 2 1 4 3이 된다.

**예제 입력**

```
3
1 0
5
4 2
1 2 3 4
6 0
1 1 9 1 1 1
```

### 출력

**<u>각 test case에 대해 문서가 몇 번째로 인쇄되는지 출력</u>**한다.

**예제 출력**

```
1
2
5
```

### 제한

- **시간 제한 : 2초**(대략 2억 번 연산 가능)
- **메모리 제한** : 128MB

# 문제 풀이

## 접근

**문제에 명시된 방법으로 답을 구하면 된다.**

다만 답을 구하면서 큐에서 요소를 반복적으로 삭제, 삽입하기 때문에 요소의 위치가 계속 변경된다.

**처음에 숫자 목록들을 큐에 저장할 때, <u>중요도와 처음 위치를 같이 저장</u>**하여 처음에 **M 위치에 있던 요소가 삭제될 때까지** 문제의 규칙에 따라 연산한다.

## 알고리즘

- **큐 배열에 중요도와 처음 위치를 같이 저장**한다.
- **M 위치에 있는 요소가 삭제될 때까지** 다음 **연산**을 수행한다.
  - 현재 큐의 **가장 앞에 있는 요소를 큐에서 삭제**한다.
  - 삭제한 요소의 **중요도가 큐에 남아있는 요소들의 중요도보다 작으면**, 삭제한 요소를 **큐의 맨 뒤에 삽입**한다.
  - 삭제한 요소의 **중요도가 큐에 남아있는 요소들의 중요도보다 크면**, **삭제한 요소의 수를 1 늘린다**. 이때 **삭제한 요소의 처음 위치가 M이면 연산을 끝낸다**.
- 연산이 끝날 때까지 삭제한 요소의 수가 M이 몇 번째로 삭제되었는지와 같으므로, **삭제한 요소의 수를 출력**한다.

## 구현

```javascript
//https://www.acmicpc.net/problem/1966

const input = [];
let inputIndex = 0;

//입력으로 들어온 숫자 문자열을 숫자 배열로 바꾸어 반환하는 함수
const strToNumArr = (str) =>
  str.split(' ').map((numString) => Number(numString));
//[중요도, 처음 위치] 배열들이 들어있는 큐를 반환하는 함수
const getNumIndexArrayQueue = (str) =>
  str.split(' ').map((numString, index) => [Number(numString), index]);
//매개변수로 들어온 큐 요소들의 중요도 최댓값을 반환하는 함수
const getMaxNum = (numIndexArrayQueue) =>
  Math.max(...numIndexArrayQueue.map((numIndexArray) => numIndexArray[0]));

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    let t = Number(input[inputIndex++]);
    //테스트 케이스 수만큼 반복
    while (t--) {
      const [N, M] = strToNumArr(input[inputIndex++]);
      //큐에 [중요도, 처음 위치]들 저장
      const queue = getNumIndexArrayQueue(input[inputIndex++]);

      //현재 중요도, 현재 중요도의 처음 위치, 큐 요소들의 중요도 최댓값을 담는 변수
      let currentNum, currentInitialIndex, maxNum;
      //삭제한 요소의 수(M이 몇 번째로 삭제되는지) 담는 변수
      let result = 0;
      while (true) {
        //큐의 맨 앞 요소 삭제한 후 저장
        const current = queue.shift();
        [currentNum, currentInitialIndex] = current;
        maxNum = getMaxNum(queue);

        //중요도가 큐에 남아있는 요소들의 중요도 최댓값보다 작을 때
        if (currentNum < maxNum) {
          // 삭제한 요소 큐의 맨 뒤에 삽입
          queue.push(current);
        }
        //중요도가 큐에 남아있는 요소들의 중요도 최댓값보다 크거나 같을 때
        if (currentNum >= maxNum) {
          //삭제한 요소의 수 + 1
          result++;
          //삭제한 요소의 처음 위치가 M일 때
          if (currentInitialIndex === M) {
            //반복문 종료
            break;
          }
        }
      }

      //삭제한 요소의 수(M이 몇 번째로 삭제되었는지) 출력
      console.log(result);
    }
  });
```
