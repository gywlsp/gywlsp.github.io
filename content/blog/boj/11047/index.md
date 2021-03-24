---
title: '백준 11047번 동전 0 - node.js'
date: '2021-02-17T15:36:36+00:00'
description: '백준 11047번 동전 0을 풀이하는 글입니다.'
tags: ['백준', 'Javascript', '그리디']
thumbnail: 'boj_11047.png'
---

> 이 글은 [백준 11047번 동전 0](https://www.acmicpc.net/problem/11047)을 풀이한다. 코드는 javascript로 구현하였다.

# 문제

준규가 가지고 있는 동전은 총 **N종류**이고, 각각의 동전을 매우 많이 가지고 있다.

동전을 적절히 사용해서 그 가치의 **합을 K로** 만들려고 한다. 이때 **필요한 동전 개수의 최솟값**을 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 N과 K가 주어진다. (1 ≤ **N ≤ 10**, 1 ≤ K ≤ 100,000,000)

둘째 줄부터 N개의 줄에 동전의 가치 Ai가 **오름차순**으로 주어진다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)

### 예제 입력 1

```bash
10 4200
1
5
10
50
100
500
1000
5000
10000
50000
```

## 출력

첫째 줄에 **<u>K원을 만드는 데 필요한 동전 개수의 최솟값</u>**을 출력한다.

```bash
6
```

# 풀이

## 접근

K원을 만들 때 **동전을 적게 쓰기 위해서는 가치가 큰 동전을 써야** 한다. 따라서 **가치가 큰 동전부터 K원을 만드는 데에 해당 동전을 쓸 수 있을지 파악**하려 했다.

## 알고리즘

동전의 가치가 큰 것부터 다음 과정을 반복한다.

- K를 동전의 가치로 나눈다.
  - 몫이 0이면 continue
  - 아니면 몫을 결과값에 더하고, K를 나머지로 갱신
  - 갱신한 K가 0이면 break

## 구현

### 코드

```jsx
const input = [];
const strToNumArr = (str) =>
  str.split(' ').map((numString) => Number(numString));

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [N, K] = strToNumArr(input.shift());
    const values = input.map((v) => Number(v));

    let k = K,
      v,
      q,
      result = 0;
    //동전의 가치가 큰 것부터
    for (let i = N - 1; i >= 0; i--) {
      v = values[i];
      //k를 동전의 가치로 나눈 몫을 저장
      q = Math.floor(k / v);
      //몫이 0이면 해당 동전 사용할 수 없다는 뜻이므로 다음으로
      if (q === 0) {
        continue;
      }
      //q를(사용 가능한 동전 개수) result에 더해줌
      result += q;
      //나머지 k에 저장
      k %= v;
      //k원 다 만들었으면 종료
      if (k === 0) {
        break;
      }
    }

    console.log(result);
  });
```
