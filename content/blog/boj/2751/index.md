---
title: '백준 2751번 수 정렬하기 2 - node.js'
date: '2020-09-30T10:23:23+00:00'
description: '백준 2751번 수 정렬하기 2를 javascript로 풀이하는 글입니다.'
tags: ['백준', '알고리즘','Javascript', '정렬']
thumbnail: 'boj_2751.png'
---

이 글은 백준 2751번 수 정렬하기 2를 풀이한다. [문제 링크](https://www.acmicpc.net/problem/2751)  
코드는 javascript로 작성하였다.

# 문제 파악

- N개의 수가 주어졌을 때, 이를 **오름차순으로 정렬하는 프로그램을 작성**하시오.

### 입력

- **첫째 줄**에 수의 개수 **N(1 ≤ N ≤ 1,000,000)**이 주어진다.
- **둘째 줄**부터 N개의 줄에는 **숫자가 주어진다**.
- 이 수는 절댓값이 1,000,000보다 작거나 같은 정수이다.
- 수는 중복되지 않는다.

**예제 입력**

```powershell
5
5
4
3
2
1
```

### 출력

- 첫째 줄부터 N개의 줄에 **오름차순으로 정렬한 결과를 한 줄에 하나씩 출력**한다.

**예제 출력**

```powershell
1
2
3
4
5
```

### 시간 제한

- 2초

### 메모리 제한

- 128MB

# 문제 풀이

## 알고리즘

[javascript sort 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)를 이용해 수를 정렬한 후 결과 값을 출력하였다.

## 참고

### 시간 초과

처음에 결과 값을 출력할 때 정렬된 배열의 요소 하나씩 출력했더니 시간 초과가 되었다. 구글링해보니 **console.log()가 느려 생긴 문제**였다. [출처](https://www.acmicpc.net/board/view/47265)

그래서 **결과값 배열의 요소들을 javascript join 메서드로 합친 후 출력하니 문제가 해결**되었다.

## 구현

```jsx
//https://www.acmicpc.net/problem/2751

let input = [];

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [N, ...numList] = input.map((e) => Number(e));
    const result = numList.sort((a, b) => a - b);
    console.log(result.join('\n'));
  });
```
