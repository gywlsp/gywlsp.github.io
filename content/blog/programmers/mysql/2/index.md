---
title: '프로그래머스 SQL 고득점 KIT - SUM, MAX, MIN'
date: '2021-03-12T09:28:51+00:00'
description: '프로그래머스 SQL 고득점 KIT 중 SUM, MAX, MIN 문제들의 답과 푸는 데에 필요한 개념들을 담고 있는 글이다.'
tags: ['프로그래머스', 'MySQL']
thumbnail: 'programmers_mysql_2.png'
---

> 이 글은 [프로그래머스 SQL 고득점 KIT 중 SUM, MAX, MIN 문제들](https://programmers.co.kr/learn/courses/30/parts/17043)의 답과 푸는 데에 필요한 개념들을 담고 있다.

## 필요한 개념

- `max`, `min`, `count`, `distinct` [설명](https://gywlsp.github.io/mysql/3/)
- **null 비교**는 일반 연산자로는 불가능하고 `is null`, `is not null`로만 가능하다.

## 문제

1. **최댓값 구하기**

   ```sql
   select max(datetime) from animal_ins;
   ```

2. **최솟값 구하기**

   ```sql
   select min(datetime) from animal_ins;
   ```

3. **동물 수 구하기**

   ```sql
   select count(*) from animal_ins;
   ```

4. **중복 제거하기**

   ```sql
   select count(distinct name) from animal_ins
   where name is not null;
   ```
