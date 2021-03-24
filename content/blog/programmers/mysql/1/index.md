---
title: '프로그래머스 SQL 고득점 KIT - SELECT'
date: '2021-03-12T08:02:33+00:00'
description: '프로그래머스 SQL 고득점 KIT 중 SELECT 문제들의 답과 필요한 개념들을 담고 있는 글이다.'
tags: ['프로그래머스', 'MySQL']
thumbnail: 'programmers_mysql_1.png'
---

> 이 글은 [프로그래머스 SQL 고득점 KIT 중 SELECT 문제들](https://programmers.co.kr/learn/courses/30/parts/17042)의 답과 푸는 데에 필요한 개념들을 담고 있다.

## 필요한 개념

- `order by` [설명](https://gywlsp.github.io/mysql/1/)
- `limit` [설명](https://gywlsp.github.io/mysql/2/)

## 문제

1. **모든 레코드 조회하기**

   ```sql
   select * from animal_ins
   order by animal_id;
   ```

2. **역순 정렬하기**

   ```sql
   select name, datetime from animal_ins
   order by animal_id desc;
   ```

3. **아픈 동물 찾기**

   ```sql
   select animal_id, name from animal_ins
   where intake_condition = 'Sick'
   order by animal_id;
   ```

4. **어린 동물 찾기**

   ```sql
   select animal_id, name from animal_ins
   where intake_condition != 'Aged'
   order by animal_id;
   ```

5. **동물의 아이디와 이름**

   ```sql
   select animal_id, name from animal_ins
   order by animal_id;
   ```

6. **여러 기준으로 정렬하기**

   ```sql
   select animal_id, name, datetime from animal_ins
   order by name, datetime desc;
   ```

7. **상위 n개 레코드**

   ```sql
   select name from animal_ins
   order by datetime
   limit 1;
   ```
