---
title: '백준 1074번 Z - javascript :: 사이다 데브로그'
date: '2020-09-09T11:00:00+00:00'
description: 'Hello World'
tags: ['Javascript', 'Algorithm']
thumbnail: 'boj_1074.png'
---

이 글은 백준 1074번 Z를 풀이한다. [문제 링크](https://www.acmicpc.net/problem/1074)<br>
코드는 javascript로 작성되었다.

# 문제 파악

- 2차원 배열을 Z모양으로 탐색한다.
- 배열의 크기는 항상 2^N \* 2^N이다.
- N은 15보다 작거나 같은 자연수이다.
- r과 c는 0보다 크거나 같고, 2^(N-1)보다 작거나 같은 정수이다.
- N>1일 때에는 배열을 2^(N-1) \* 2^(N-1) 크기의 배열로 4**<u>등분</u>** 한 후에 **<u>재귀</u>**적으로 방문한다.
- **N이 주어졌을 때, (r, c)를 몇 번째로 방문하는지 출력**하는 프로그램을 작성하시오.

> **분할 정복**을 이용해 **재귀**적으로 문제를 해결해야 함을 파악할 수 있다.

# 문제 풀이

## 코드

```javascript
//https://www.acmicpc.net/problem/1074

let input = [];
let result = 0;

const strToNumArr = (str) => str.split(' ').map((numChar) => Number(numChar));

const search = (r, c, rs, re, cs, ce) => {
  const length = re - rs + 1;
  if (length === 1) return;

  const rhalf = (rs + re) / 2;
  const chalf = (cs + ce) / 2;

  if (r < rhalf && c < chalf) {
    search(r, c, rs, Math.floor(rhalf), cs, Math.floor(chalf));
  }
  if (r < rhalf && c > chalf) {
    result += Math.pow(length / 2, 2);
    search(r, c, rs, Math.floor(rhalf), Math.ceil(chalf), ce);
  }
  if (r > rhalf && c < chalf) {
    result += Math.pow(length / 2, 2) * 2;
    search(r, c, Math.ceil(rhalf), re, cs, Math.floor(chalf));
  }
  if (r > rhalf && c > chalf) {
    result += Math.pow(length / 2, 2) * 3;
    search(r, c, Math.ceil(rhalf), re, Math.ceil(chalf), ce);
  }
};

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [n, r, c] = strToNumArr(input[0]);
    let rs = 0,
      cs = 0,
      re = (1 << n) - 1,
      ce = (1 << n) - 1;
    search(r, c, rs, re, cs, ce);
    console.log(result);
  });
```
