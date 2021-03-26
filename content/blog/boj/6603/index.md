---
title: '백준 6603번 로또 - node.js'
date: '2020-09-16T04:10:50+00:00'
description: '백준 6603번 문제 로또를 javascript로 풀이하는 글입니다.'
tags: ['백준', 'JavaScript', '재귀']
thumbnail: 'boj_6603.png'
---

이 글은 백준 6603번 로또를 풀이한다. [문제 링크](https://www.acmicpc.net/problem/6603)  
코드는 javascript로 작성하였다.

# 문제 파악

- 독일 로또는 {1, 2, ..., 49}에서 수 **6개**를 고른다.
- 로또 번호를 선택하는데 사용되는 가장 유명한 전략은 49가지 수 중 **k(k>6)개의 수를 골라 집합 S를 만든 다음 그 수만 가지고 번호를 선택**하는 것이다.
- 집합 S와 k가 주어졌을 때, **수를 고르는 모든 방법을 구하는 프로그램**을 작성하시오.

### 입력

입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스는 한 줄로 이루어져 있다. 첫 번째 수는 k (6 < k < 13)이고, 다음 k개 수는 집합 S에 포함되는 수이다. S의 원소는 **오름차순**으로 주어진다.  
입력의 마지막 줄에는 0이 하나 주어진다.

### 출력

각 **테스트 케이스마다 수를 고르는 모든 방법을 출력**한다. 이때, **사전 순**으로 출력한다.  
각 테스트 케이스 사이에는 빈 줄을 하나 출력한다.

# 문제 풀이

## 알고리즘

이 문제는 k개의 정수 중 6개의 정수를 뽑는 **조합** 문제이다. 예제 입력 _`1 2 3 4 5 6 7`_ 중 6개를 뽑는 조합을 오름차순(사전순)으로 출력하는 방법을 알아보자.  
S의 원소가 **오름차순**으로 주어지기 때문에, **앞쪽에 있는 원소부터 하나를 뽑고, 나머지 수 중 5개를 택**하는 조합을 구한 후, 그 둘을 **합쳐서 출력**하면 된다.  
나머지 수 중 **<u>n개</u>를 택하는 조합**도 마찬가지로 **<u>앞쪽에 있는 원소부터 하나를 뽑고, 나머지 수 중 n-1개를 택</u>**하면 된다.

(1-1) _`[1]`_ + 2 3 4 5 6 7 중 5개 뽑기 <br><br>
--(2-1)-- _`[1, 2]`_ + 3 4 5 6 7 중 4개 뽑기 <br><br>
----(3-1)---- _`[1, 2, 3]`_ + 4 5 6 7 중 3개 뽑기 <br><br>
------(4-1)------ _`[1, 2, 3, 4]`_ + 5 6 7 중 2개 뽑기 <br><br>
--------(5-1)-------- _`[1, 2, 3, 4, 5]`_ + 6 7 중 1개 뽑기

> _`[1, 2, 3, 4, 5, 6]`_ _`[1, 2, 3, 4, 5, 7]`_

--------(5-2)-------- _`[1, 2, 3, 4, 6]`_ + 7 중 1개 뽑기

> _`[1, 2, 3, 4, 6, 7]`_

------(4-2)------ _`[1, 2, 3, 5]`_ + 6 7 중 2개 뽑기

> _`[1, 2, 3, 5, 6, 7]`_

----(3-2)---- _`[1, 2, 4]`_ + 5 6 7 중 3개 뽑기

> _`[1, 2, 4, 5, 6, 7]`_

--(2-2)-- _`[1, 3]`_ + 4 5 6 7 중 4개 뽑기

> _`[1, 3, 4, 5, 6, 7]`_

(1-2) _`[2]`_ + 3 4 5 6 7 중 5개 뽑기

> _`[2, 3, 4, 5, 6, 7]`_

```
1 2 3 4 5 6
1 2 3 4 5 7
1 2 3 4 6 7
1 2 3 5 6 7
1 2 4 5 6 7
1 3 4 5 6 7
2 3 4 5 6 7
```

## 구현

```javascript
//https://www.acmicpc.net/problem/6603

let input = [];

const strToNumArr = (str) => str.split(' ').map((numChar) => Number(numChar));

const getCombinations = function (arr, selectNum) {
  const results = [];
  if (selectNum === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombinations(rest, selectNum - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
};

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    let t = input.length - 1;
    let inputIndex = 0;
    while (t--) {
      const [n, ...numList] = strToNumArr(input[inputIndex++]);
      getCombinations(numList, 6).forEach((numList) =>
        console.log(numList.join(' '))
      );
      console.log('');
    }
  });
```
