---
title: '백준 7576번 토마토 - node.js'
date: '2021-03-02T06:59:11+00:00'
description: '백준 7576번 토마토를 풀이하는 글입니다.'
tags: ['백준', '알고리즘','Javascript', '그래프', 'BFS']
thumbnail: 'boj_7576.png'
---

> 이 글은 [백준 7576번 토마토](https://www.acmicpc.net/problem/7576)를 풀이한다. 코드는 javascript로 작성하였다.

# 문제

철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.

![https://www.acmicpc.net/upload/images/tmt.png](https://www.acmicpc.net/upload/images/tmt.png)

창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. **보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다.** 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 **창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 알고 싶어 한다.**

**<u>토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성</u>**하라. 단, **상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.**

## 입력

첫 줄에는 상자의 크기를 나타내는 두 정수 M,N이 주어진다. **M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M,N ≤ 1,000** 이다. 둘째 줄부터는 하나의 상자에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 **1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸**을 나타낸다.

**토마토가 하나 이상 있는 경우만 입력으로 주어진다.**

### 예제 입력 2

```plain text
6 4
0 -1 0 0 0 0
-1 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1
```

### 예제 입력 3

```plain text
6 4
1 -1 0 0 0 0
0 -1 0 0 0 0
0 0 0 0 -1 0
0 0 0 0 -1 1
```

## 출력

여러분은 **토마토가 모두 익을 때까지의 최소 날짜**를 출력해야 한다. 만약, **저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력**해야 한다.

### 예제 출력 2

```plain text
-1
```

### 예제 출력 3

```plain text
6
```

# 풀이

문제에 명시된 대로, 답을 구하기 위해 전 날짜에 익은 토마토들과 인접한, 아직 익지 않은 토마토들을 익게 만든다. **새로 익은 인접 토마토가 없다면, 이미 모든 토마토가 익었거나 더이상 토마토를 익게 만들 수 없는 상태이므로 인접 토마토를 익게 만드는 과정을 끝낸다**. 이때 **익은 토마토의 개수가 전체 토마토의 개수와 같다면 날짜를 출력**하고, **아니라면 -1을 출력**하면 된다.

## 구현

아래 코드 + 설명 있습니다.

### 코드

```jsx
const input = [];

const strToNumArr = (str) => str.split(" ").map(Number);
const drList = [1, -1, 0, 0];
const dcList = [0, 0, 1, -1];

require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", function (line) {
    input.push(line.trim());
  })
  .on("close", function () {
    const [C, R] = strToNumArr(input.shift());
    let tomatoCount = C * R,
      ripeCount = 0;

    let prevRipeList = [];
    const box = input.map((str, r) =>
      str.split(" ").map((state, c) => {
        const ret = Number(state);
        if (ret === -1) {
          tomatoCount--;
        }
        if (ret === 1) {
          prevRipeList.push(`${r} ${c}`);
          ripeCount++;
        }
        return ret;
      })
    );

    let t = 0;
    const newRipeSet = new Set();
    while (true) {
      prevRipeList.forEach((pos) => {
        const [r, c] = strToNumArr(pos);
        drList.forEach((dr, i) => {
          const dc = dcList[i],
            nextR = r + dr,
            nextC = c + dc;
          if (
            nextR < 0 ||
            nextR >= R ||
            nextC < 0 ||
            nextC >= C ||
            box[nextR][nextC] !== 0
          ) {
            return;
          }
          box[nextR][nextC] = 1;
          newRipeSet.add(`${nextR} ${nextC}`);
        });
      });

      if (newRipeSet.size === 0) {
        break;
      }

      t++;
      ripeCount += newRipeSet.size;
      prevRipeList = Array.from(newRipeSet);
      newRipeSet.clear();
    }
    
    console.log(ripeCount === tomatoCount ? t : -1);
  });
```

### 코드+설명

```jsx
const input = [];

const strToNumArr = (str) => str.split(" ").map(Number);
//인접 토마토 위치 계산에 활용
const drList = [1, -1, 0, 0];
const dcList = [0, 0, 1, -1];

require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", function (line) {
    input.push(line.trim());
  })
  .on("close", function () {
    //M(가로 칸의 수) = C(열의 개수)
    //N(세로 칸의 수) = R(행의 개수)
    const [C, R] = strToNumArr(input.shift());
    //창고 안 토마토의 개수, 익은 토마토의 개수
    let tomatoCount = C * R,
      ripeCount = 0;

    //뒤에서 쓰이는 배열. 전 날짜에 익은 토마토의 위치들을 담음.
    let prevRipeList = [];
    //창고 입력 저장
    const box = input.map((str, r) =>
      str.split(" ").map((state, c) => {
        const ret = Number(state);
        if (ret === -1) {
          tomatoCount--;
        }
        if (ret === 1) {
          prevRipeList.push(`${r} ${c}`);
          ripeCount++;
        }
        return ret;
      })
    );

    //날짜, 새로 익은 토마토 담는 Set
    let t = 0;
    const newRipeSet = new Set();
    while (true) {
      //전 날짜에 익은 토마토의 인접 토마토 익게 만듦
      prevRipeList.forEach((pos) => {
        const [r, c] = strToNumArr(pos);
        //인접 토마토 익게 만듦
        drList.forEach((dr, i) => {
          const dc = dcList[i],
            nextR = r + dr,
            nextC = c + dc;
          //위치가 유효하지 않거나, 칸에 익지 않은 토마토가 없으면 리턴
          if (
            nextR < 0 ||
            nextR >= R ||
            nextC < 0 ||
            nextC >= C ||
            box[nextR][nextC] !== 0
          ) {
            return;
          }
          //토마토 익게 만듦
          box[nextR][nextC] = 1;
          //새로 익은 토마토 담는 Set에 위치 저장
          newRipeSet.add(`${nextR} ${nextC}`);
        });
      });

      //새로 익은 토마토가 없으면 모든 토마토가 익었거나
      //토마토를 더 익게 할 수 없는 상태이므로
      //날짜를 +1 하지 않고 break
      if (newRipeSet.size === 0) {
        break;
      }

      t++;
      //익은 토마토 개수에 새로 익은 토마토 개수를 더해줌
      ripeCount += newRipeSet.size;
      //전 과정에서 익은 토마토 배열을 담는 변수에 새로 익은 토마토들을 대입
      prevRipeList = Array.from(newRipeSet);
      //새로 익은 토마토 담는 Set 비우기
      newRipeSet.clear();
    }
    
    //익은 토마토의 개수가 입력의 토마토 개수와 같다면 다 익은 것이므로 t,
    //아니면 다 익을 수 없는 상태이므로 -1을 출력
    console.log(ripeCount === tomatoCount ? t : -1);
  });
```