---
title: 'HTTP, HTTPS의 차이와 SSL/TLS'
date: '2022-04-03T02:35:15+00:00'
description: '이 글은 HTTP 응답 상태 코드에 대해 설명한다.'
tags: ['Web']
thumbnail: 'web_2.png'
---

# HTTP란?

- HyperText Transfer Protocol
- W3 상에서 서버와 클라이언트가 데이터를 주고 받기 위한 프로토콜이다.
- 80번 포트를 사용한다.

# HTTPS란?

- HyperText Transfer Protocol **Secure**
- HyperText Transfer Protocol over Secure Socket Layer, HTTP over TLS, HTTP over SSL, HTTP Secure 등으로 불리는 HTTPS는 HTTP에 데이터 암호화가 추가된 프로토콜이다.
- 1995년 Netscape사에서 SSL(Secure Sockets Layer)을 개발하였고, 1999년에 IETF(Internet Engineering Task Force, 국제 인터넷 표준화 기구)를 통해 국제 표준이 되면서 이름이 TLS(Transport Layer Security)로 변경되었다.
- 443번 포트를 사용한다.

## 장점

- 내가 사이트에 보내는 정보들을 제 3자가 알아볼 수 없도록 **암호화**한다.
  - HTTP를 사용하면 요청이 입력한 텍스트 그대로 누구든 알아볼 수 있는 형식으로 보내진다.
  - HTTPS를 사용하면 요청 데이터를 서버만 알아볼 수 있게 암호화해서 보낸다.
- 접속한 사이트를 **신뢰**할 수 있는지 알려준다.
  - 공인된 기관(CA - Certificate Authority)으로부터 검증된 사이트만 HTTPS를 사용할 수 있다.

## 암호화 방식

HTTPS는 TLS로 대칭키 암호화 방식과 비대칭키 암호화 방식을 이용해 데이터 암호화/복호화에 사용하는 세션 키를 생성한다. 각각의 암호화 방식은 다음과 같다.

- **대칭키 암호화**
  - 클라이언트와 서버가 동일한 키를 사용해 암호화/복호화를 진행한다.
  - 키가 노출되면 매우 위험하지만 연산 속도가 빠르다.
- **비대칭키 암호화**
  - 한 쌍으로 구성된 공개키와 개인키를 암호화/복호화 하는 데 사용한다.
  - 키가 노출되어도 비교적 안전하지만 연산 속도가 느리다.
  - 암호화를 공개키로 하느냐 개인키로 하느냐에 따라 얻는 효과가 다르다.
    - **공개키 암호화**: 상대방이 나의 공개키로 데이터를 암호화하면, 나의 개인 키로만 복호화할 수 있다.
      : 나의 개인키는 나만 가지고 있으므로, 나만 볼 수 있다.
    - **개인키 암호화**: 상대방이 자신의 개인키로 데이터를 암호화하면, 상대방의 공개키로만 복호화할 수 있다.
      : 공개키는 모두에게 공개되어 있으므로, 상대방이 인증한 정보임을 알려 신뢰성을 보장할 수 있다.

## TLS Handshake

HTTPS는 대칭키 암호화와 비대칭키 암호화를 모두 사용하여 빠른 연산 속도와 안정성을 모두 얻고 있다. HTTPS 연결 과정(Hand Shaking)에서는 먼저 서버와 클라이언트 간의 세션 키를 생성한다. 여기서 세션키는 주고받는 데이터를 암호화하기 위해 사용되는 대칭키이며, 데이터간의 교환에는 빠른 연산 속도가 필요하므로 세션키는 대칭키로 만들어진다. 문제는 이 세션 키를 클라이언트와 서버가 어떻게 교환할 것인가인데, 이 과정에서 비대칭키가 사용된다. 즉, 처음 연결을 성립하여 안전하게 세션 키를 생성하는 과정에서 비대칭키가 사용되는 것이고, 이후에 데이터를 교환하는 과정에서 빠른 연산 속도를 위해 대칭키가 사용되는 것이다.

1. Client Hello: 클라이언트(브라우저)가 생성한 랜덤 데이터, 클라이언트가 지원하는 암호화 방식, Session Id를 서버로 전송한다.
2. Server Hello: 서버가 생성한 랜덤 데이터, 서버가 선택한 암호화 방식, CA 비밀키로 암호화된 TLS 인증서를 클라이언트에게 전송한다.
3. 클라이언트는 이 인증서를 브라우저에 내장된 CA의 공개키로 복호화해 유효성을 검사한다.
4. 클라이언트는 자신과 서버가 Client Hello와 Server Hello에서 각각 만들었던 무작위 데이터를 혼합해 프리 마스터 키(임시 키)를 만든다.
5. 클라이언트는 복호화한 인증서에서 파악한 서버의 공개키로 프리 마스터 키를 암호화하여 서버로 전송한다.
6. 클라이언트와 서버 양쪽에서 임시 키로부터 일련의 과정을 거쳐 세션 키를 획득하고, 이를 데이터 암호화/복호화에 사용한다.

![TLS Handshake](https://media.vlpt.us/images/gywlsp/post/e6be45c0-9f21-4c7c-bf8a-42e4e7283f3f/image.png)

**참고**

- [https://mangkyu.tistory.com/98](https://mangkyu.tistory.com/98)
- [https://www.youtube.com/watch?v=H6lpFRpyl14](https://www.youtube.com/watch?v=H6lpFRpyl14)
- [https://velog.io/@shkilo/HTTPS와-SSLTLS-정리](https://velog.io/@shkilo/HTTPS%EC%99%80-SSLTLS-%EC%A0%95%EB%A6%AC)
