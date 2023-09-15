# react-nyt-app
🚀 : [배포 홈페이지 바로가기](https://react-nyt-app.vercel.app/)

<br />

## 목차

[1. 프로젝트 소개](#1-프로젝트-소개)

[2. 적용 기술 및 구현 기능](#2-적용-기술-및-구현-기능)

[3. 설치 및 시작 가이드](#3-설치-및-시작-가이드)

[4. 설정 및 구성](#4-설정-및-구성)

<br/>

### 1. 프로젝트 소개
-  New york times에서 제공하는 API를 활용한 기사 정보 검색 서비스 클론코딩 프로젝트

- 개발 기간 : 2023-09

<br/>

### 2. 적용 기술 및 구현 기능
#### 적용 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=Recoil&logoColor=white"/> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=ReactQuery&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/ReactToastify-000000?style=flat&logo=ReactToastify&logoColor=white"/> <img src="https://img.shields.io/badge/ReactInterSectionObserver-000000?style=flat&logo=ReactInterSectionObserver&logoColor=white"/> <img src="https://img.shields.io/badge/TailWindCSS-06B6D4?style=flat&logo=TailWindCSS&logoColor=white"/>

#### 구현 기능

  - HomePage
    ![image](https://github.com/Dorabang/react-nyt-app/assets/39180932/b18565a7-c985-448e-968f-a6b0b6dc55d1)
    - NYT에서 제공하는 API를 사용하여 기사 정보들을 확인할 수 있습니다.
    - 해당 기사의 제목을 클릭하면 해당 기사를 볼 수 있는 페이지로 이동합니다.
    - 이동 후, 뒤로가기 버튼을 누르면 다시 현재 서비스로 돌아옵니다.
    - 무한 스크롤 기능으로 하단에 도착하면 다음 기사 정보를 불러옵니다.

    ![image](https://github.com/Dorabang/react-nyt-app/assets/39180932/a97f1bb6-35d6-4e95-95cb-28380c5f09dd)
    - 스크랩 토글 기능, 스크랩 토글 시 토스트로 메세지를 띄어줍니다.
    
    ![image](https://github.com/Dorabang/react-nyt-app/assets/39180932/d9f491af-efd6-4375-b2bf-c2f720681cb8)
    - 상단 필터 클릭 사, 필터 옵션 모달창을 띄워줍니다. 모달창 외부를 클릭하면 모달창이 닫힙니다.

    ![image](https://github.com/Dorabang/react-nyt-app/assets/39180932/243141fb-b5f7-443e-85ea-a45e4db264d2)
    - 필터 옵션 선택 후, `필터 적용하기` 버튼을 눌러주면 필터가 적용됩니다.

  - ScrapePage
    ![image](https://github.com/Dorabang/react-nyt-app/assets/39180932/5dd9c9e0-5920-49ba-904e-f9d30bbbf7d2)
    - 홈페이지와 기능은 동일하지만 스크랩된 기사가 없을 시, 홈으로 이동하는 버튼을 렌더합니다.

    ![image](https://github.com/Dorabang/react-nyt-app/assets/39180932/8279c005-97c6-4444-8d6f-23acb51145a2)
    - 기사를 스크랩 해제 시, 해당 화면에서 바로 사라집니다.
    - 웹을 껐다 켜도 스크랩된 데이터는 남아있습니다.

<br/>

### 3. 설치 및 시작 가이드

- 해당 리포지토리 클론 후,
```
npm install
npm run start
```

<br/>

### 4. 설정 및 구성

- 프로젝트의 환경 변수는 root 폴더에 `.env`파일 생성 후,<br/>
[New york times API](https://developer.nytimes.com/apis) 사이트에 로그인하여 발급 받은 API 키를 `REACT_APP_API_KEY`에 넣어주시면 됩니다.
