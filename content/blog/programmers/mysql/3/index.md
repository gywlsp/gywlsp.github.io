---
title: '프로그래머스 SQL 고득점 KIT - GROUP BY'
date: '2021-03-15T14:00:22+00:00'
description: '프로그래머스 SQL 고득점 KIT 중 GROUP BY 문제들의 답과 푸는 데에 필요한 개념들을 담고 있는 글이다.'
tags: ['프로그래머스','MySQL']
thumbnail: 'programmers_mysql_3.png'
---

> 이 글은 [프로그래머스 SQL 고득점 KIT 중 GROUP BY 문제들](https://programmers.co.kr/learn/courses/30/parts/17044)의 답과 푸는 데에 필요한 개념들을 담고 있다.

## 필요한 개념
- `group by`, `having` [설명](https://gywlsp.github.io/mysql/4/)
- **사용자 정의 변수:** MySQL에서 아래과 같이 사용자 정의 변수를 선언해 사용할 수 있다. `SET` 이외의 명령문에서는 `=`가 비교연산자로 취급되기 때문에, `SELECT`문에서 변수를 선언하고 값을 대입하고 싶다면 `:=`를 사용해야 한다. 
    ```sql
    set @변수이름 = 대입값;
    set @변수이름 := 대입값;

    -- := only
    select @변수이름 := 대입값; 
    ```

## 문제

1. **고양이와 개는 몇 마리 있을까**

    ```sql
    select animal_type, count(animal_type) from animal_ins
    group by animal_type
    order by animal_type;
    ```

2. **최솟값 구하기**

    ```sql
    select name, count(name) from animal_ins
    group by name
    having name is not null and count(name) != 1
    order by name;
    ```

3. **입양 시각 구하기(1)**

    ```sql
    select hour(datetime) HOUR, count(datetime) COUNT
    from animal_outs
    group by hour(datetime)
    having hour >= 9 and hour <= 19
    order by hour;
    ```

4. **입양 시각 구하기(2)**

    ```sql
    set @hour = -1;

    select (@hour := @hour + 1) as HOUR,
    (select count(*) from animal_outs
    where hour(datetime) = @hour) as COUNT
    from animal_outs where @hour < 23;
    ```