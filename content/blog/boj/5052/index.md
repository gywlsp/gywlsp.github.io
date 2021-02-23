---
title: '백준 5052번 전화번호 목록 - node.js'
date: '2021-02-23T15:03:19+00:00'
description: '백준 5052번 전화번호 목록을 javascript로 풀이하는 글입니다.'
tags: ['Javascript', 'Algorithm']
thumbnail: 'boj_5052.png'
---
> 이 글은 백준 5052번 구간 합 구하기를 풀이한다. [문제 링크](https://www.acmicpc.net/problem/5052)
코드는 javascript로 작성하였다.

# 문제

전화번호 목록이 주어진다. 이때, 이 **목록이 일관성이 있는지 없는지를 구하는 프로그램**을 작성하시오.

전화번호 목록이 **일관성을 유지하려면, 한 번호가 다른 번호의 접두어인 경우가 없어야** 한다.

예를 들어, 전화번호 목록이 아래와 같은 경우를 생각해보자

- 긴급전화: 911
- 상근: 97 625 999
- 선영: 91 12 54 26

이 경우에 선영이에게 전화를 걸 수 있는 방법이 없다. 전화기를 들고 선영이 번호의 처음 세 자리를 누르는 순간 바로 긴급전화가 걸리기 때문이다. 따라서, 이 목록은 일관성이 없는 목록이다.

## 입력

첫째 줄에 **테스트 케이스의 개수 t**가 주어진다. **(1 ≤ t ≤ 50)** 각 테스트 케이스의 첫째 줄에는 **전화번호의 수 n**이 주어진다. **(1 ≤ n ≤ 10000)** 다음 n개의 줄에는 목록에 포함되어 있는 전화번호가 하나씩 주어진다. 전화번호의 길이는 길어야 10자리이며, **목록에 있는 두 전화번호가 같은 경우는 없다**.

### 예제 입력 1

```bash
2
3
911
97625999
91125426
5
113
12340
123440
12345
98346
```

## 출력

각 테스트 케이스에 대해서, **일관성 있는 목록인 경우에는 YES, 아닌 경우에는 NO**를 출력한다.

### 예제 출력 1

```bash
NO
YES
```

# 풀이

## 접근

전화번호 목록의 일관성을 파악하기 위해, 한 번호가 다른 번호의 접두어인 경우가 있는지 확인해야 한다. **목록에 동일한 전화번호가 없기 때문에 입력으로 받은 번호들을 문자열 오름차순으로 정렬하여 확인**하려 했다. 

## 알고리즘

### [1] 전화번호 문자열 오름차순 정렬

먼저 입력의 전화번호를 **문자열 오름차순으로 정렬**한다. 예를 들어, 1, 2, 11을 숫자 오름차순으로 정렬하면 1, 2, 11이지만, 문자열 오름차순으로 정렬하면 '1', '11', '2'이다.

### [2] **한 번호가 다른 번호의 접두어인 경우가 존재하는지 확인**

전화번호들을 문자열 오름차순으로 정렬했기 때문에, **번호 A가 다른 번호의 접두어인 경우가 존재한다면, 번호 A 바로 뒤에 A를 접두어로 가지는 번호가 오는 경우가 항상 존재**한다. 따라서 이런 경우가 있다면 NO를, 다 검사했는데 없다면 YES를 출력하면 된다.

```
11
112
113 
```

## 구현

### 코드

```jsx
const input = [];

require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", function (line) {
    input.push(line.trim());
  })
  .on("close", function () {
    let inputIndex = 0;
    let t = Number(input[inputIndex++]);
    while (t--) {
      const N = Number(input[inputIndex++]);
      const sortedNumbers = [...Array(N)].map(() => input[inputIndex++]).sort();
      let prevNumLength = 0,
        result = "YES";
      for (let i = 0; i < N; i++) {
        if (sortedNumbers[i].slice(0, prevNumLength) === sortedNumbers[i - 1]) {
          result = "NO";
          break;
        }
        prevNumLength = sortedNumbers[i].length;
      }
      console.log(result);
    }
  });
```