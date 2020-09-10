---
title: '백준 1074번 Z :: 사이다 데브로그'
date: '2020-09-09T11:00:00+00:00'
description: 'Hello World'
tags: ['Javascript', 'Algorithm']
thumbnail: 'boj_1074.png'
---

#Header1
Header1
======
##Header2
###Header3
####Header4

---

# 목록

- **안녕**
- 제발
- 왜이래
  - 안녕
  - 제발
  - 왜이래

---

# 포인트

1. 박스 : _양 옆 별_ em<br>
   - 안녕
   - 안녕하세요
2. 코드 : _`string`_ 양 옆 별₩\_ strong em code<br>
3. 색깔 : *`<u></u>`*를 <u>사용</u> u<br>
4. 두껍게 : **양 옆 별별** strong <br>
5. 찍 : ~~양 옆 물결물결~~ del<br>

---

# 글에서의 사용

<u>안녕하세용가리</u>
안녕하세용가리
안녕하세용가리
_`string`_
안녕하세용가리
안녕하세용가리
**안녕하세용가리**
안녕하세용가리
안녕하세용가리
안녕하세용가리
안녕하세용가리
안녕하세용가리
안녕하세용가리
안녕하세용가리
안녕하세용가리
~~안녕하세용가리~~
안녕하세용가리
안녕하세용가리

---

---

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

<center>test.ts</center>
