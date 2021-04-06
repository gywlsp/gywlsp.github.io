---
title: '클라우드와 클라우드 컴퓨팅'
date: '2021-03-27T13:28:28+00:00'
description: '이 글은 클라우드와 클라우드 컴퓨팅에 대해 설명한다.'
tags: ['Tech']
thumbnail: 'tech_1.png'
---

> 이 글은 클라우드와 클라우드 컴퓨팅에 대해 설명한다. Microsoft Azure와 Cloudflare의 클라우드 관련 문서들을 참고하여 글을 작성했다.

# 클라우드란?

클라우드에 대한 정의가 모호할 수 있지만, 클라우드는 기본적으로 각각 고유한 기능을 가진 서버의 글로벌 네트워크를 설명하는 데에 사용되는 용어이다. **클라우드는 <u>실제 엔티티가 아니지만 함께 연결되어 하나의 에코시스템으로 작동하게 되어있는, 전 세계에 분산된 원격 서버의 광대한 네트워크</u>**이다.

![what-is-the-cloud.png](https://www.cloudflare.com/resources/images/slt3lc6tev37/3YT0gya2bkUeuMrnGxhjAZ/4146c20c214cf001c74c0868ddfb9503/what-is-the-cloud.png)

# 클라우드의 용도

클라우드를 통해 사용자는 거의 모든 장치에서 동일한 파일과 어플리케이션을 액세스할 수 있다. 컴퓨팅과 저장이 사용자 장치에서 로컬로 실행되지 않고 데이터 센터의 서버에서 이루어지기 때문이다. 따라서 사용자는 이전 휴대전화가 고장난 후 새로운 휴대전화에서 Instagram 계정에 로그인해도 모든 사진, 동영상, 대화 이력이 그대로 계정에 유지되어 있는 것을 보게 된다. Gmail이나 Microsoft Office 365와 같은 클라우드 이메일 제공 업체, Dropbox나 Google Drive같은 클라우드 저장소 제공 업체와 동일한 방식으로 작동한다. [용도 더 알아보기](https://azure.microsoft.com/ko-kr/overview/what-is-cloud-computing/#uses)

# 클라우드 컴퓨팅이란?

클라우드 컴퓨팅은 **<u>인터넷(클라우드)를 통해 서버, 스토리지, 데이터베이스, 네트워킹, 소프트웨어, 분석, 인텔리전스 등의 컴퓨팅 서비스를 제공하는 것</u>**이다.

사용자와 기업은 클라우드 컴퓨팅을 사용하여 직접 물리적 서버를 관리하거나 자체 서버에서 소프트웨어 어플리케이션을 실행하지 않아도 된다. 또한 일반적으로 사용한 클라우드 서비스에 대해서만 요금을 지불하므로, 운영 비용을 낮추고 인프라를 보다 효율적으로 운영할 수 있다. [이점 더 알아보기](https://azure.microsoft.com/ko-kr/overview/what-is-cloud-computing/#benefits)

# 클라우드 컴퓨팅의 작동 방식

클라우드 컴퓨팅은 **가상화**라는 기술 덕분에 가능하다. 가상화란, 실체성을 지닌 컴퓨팅 환경을 만드는 것이 아니라 **가상의 컴퓨팅 환경을 만드는 것**을 의미한다. 이러한 가상 컴퓨터를 전문 용어로 **가상 머신**이라 한다. 물리적으로 동일한 컴퓨터에서 여러 대의 가상 머신이 동시에 실행될 수 있다. 가상 머신은 서로 전혀 상호작용하지 않아 한 가상 머신의 파일과 어플리케이션은 동일한 물리적 머신에 있어도 다른 가상 머신이 볼 수 없다.

**<u>많은 가상 머신을 동시에 실행하면 여러 서버와 여러 데이터 센터를 이용해 많은 조직에 서비스를 제공</u>**할 수 있다. 따라서 클라우드 제공 업체는 이런 방식으로 비용을 절감하면서 서버 사용을 동시에 훨씬 많은 고객에게 제공한다.

개별 서버가 멈추더라도 일반적으로 **클라우드 서버는 언제나 온라인 상태와 가용성을 유지해야** 하기 때문에, 일반적으로 클라우드 업체는 **여러 머신과 여러 지역에 서비스를 백업**한다. **사용자는** 사용하는 장치에 관계없이 브라우저나 앱을 사용하여 수많은 상호 연결된 네트워크, 즉 **인터넷을 통해 클라우드에 연결**한다.

# 클라우드 컴퓨팅 서비스 모델

대부분의 클라우드 컴퓨팅 서비스는 다음 네 가지 범주로 나뉜다.

1. **SaaS**
2. **PaaS**
3. **IaaS**
4. **FaaS**(서버리스)

![saas-paas-iaas-diagram.svg](https://www.cloudflare.com/img/learning/serverless/glossary/platform-as-a-service-paas/saas-paas-iaas-diagram.svg)

## SaaS(Software-as-a-Service)

사용자가 장치에 어플리케이션을 설치하는 대신, **SaaS 어플리케이션이 클라우드 서버에 호스팅되고 사용자는 인터넷을 통해 어플리케이션에 액세스**한다. SaaS는 집을 빌리는 것과 같다. 임대인이 집의 실소유주이지만 임차인이 소유주인 것처럼 집을 사용한다. SaaS 어플리케이션의 예로는 Slack, Salesforce, MailChimp가 있다.

## PaaS(Platform-as-a-Service)

이 모델에서 **기업은 자체 어플리케이션을 구축하는 데에 필요한 것들에 비용을 지불**한다. PaaS 업체는 개발 도구, 인프라, 운영 체제를 포함한 어플리케이션 구축에 필요한 모든 것을 인터넷을 통해 제공한다. PaaS는 집을 임대하는 대신 집을 짓는 데 필요한 모든 도구와 장비를 빌리는 것과 비슷하다. PaaS의 예에는 Heroku와 Microsoft Azure가 있다.

## IaaS(Infrastructure-as-a-Service)

이 모델에서 **기업은 클라우드 제공 업체로부터 필요한 서버와 장소를 임대**한다. 그리고 **클라우드 인프라로 자체 어플리케이션을 구축**한다. IaaS는 기업이 원하는 건물을 지을 수 있는 토지를 임대하는 것과 같다. 하지만 기업은 직접 건설 장비와 재료를 마련해야 한다. IaaS 제공 업체에는 DigitalOcean, Google Compute Engine, OpenStack이 있다.

📍 과거에는 SaaS, PaaS, IaaS가 클라우드 컴퓨팅의 3대 모델이었으며, 모든 클라우드 서비스는 이들 범주 중 하나에 속했다. 하지만 **최근에 네 번째 모델이 나타났다**.

## FaaS(Function-as-a-Service)

FaaS, 즉 서버리스 컴퓨팅은 **클라우드 어플리케이션을 필요할 때만 실행되는 더 작은 구성 요소로 나눈다**. 손님이 식사할 때 식당에 대해, 잘 때 침실에 대해, TV를 볼 때 거실에 대해 공간에 대한 임대료를 지불하지 않고 이용 시간에 대한 비용를 지불하는 것과 비슷한 맥락에 있다.

FaaS는 다른 클라우드 컴퓨팅 모델과 마찬가지로 여전히 서버에서 실행된다. 서버리스라고 불리는 이유는 **전용 머신에서 실행되지 않고 어플리케이션을 구축한 기업이 서버를 관리하지 않아도 되기 때문**이다.

서버리스 기능은 어플리케이션 사용자가 증가하면 확장되거나 복제된다. 식사에 많은 손님들이 찾아오면 임대인이 식당을 늘리는 것을 상상해보면 이해가 쉽다.

# 클라우드 배포 유형

클라우드 배포 유형에는 다음 네 가지가 있다.

1. **퍼블릭 클라우드**: 인터넷을 통해 일반 사용자에게 리소스를 공유하고 서비스를 제공한다.
2. **프라이빗 클라우드**: 일반 사용자에게 리소스를 공유하지 않고 일반적으로 온-프레미스에 호스트된 개인 내부 네트워크를 통해 서비스를 제공한다.
3. **하이브리드 클라우드**: 목적에 따라 퍼블릭 클라우드와 프라이빗 클라우드 간에 서비스를 공유한다.
4. **커뮤니티 클라우드**: 정부 기관 같은 조직에서만 리소스를 공유한다.