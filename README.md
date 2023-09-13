# react-nyt-app


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
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=ReactQuery&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/ReactToastify-000000?style=flat&logo=ReactToastify&logoColor=white"/> <img src="https://img.shields.io/badge/TailWindCSS-06B6D4?style=flat&logo=TailWindCSS&logoColor=white"/>

#### 구현 기능
  - HomePage
    - NYT에서 제공하는 API를 사용하여 기사 정보들을 확인할 수 있습니다.
    - 해당 기사의 제목을 클릭하면 해당 기사를 볼 수 있는 페이지로 이동합니다.
    - 이동 후, 뒤로가기 버튼을 누르면 다시 현재 서비스로 돌아옵니다.
    - 스크랩 토글 기능, 스크랩 토글 시 토스트로 메세지를 띄어줍니다.
  - ScrapePage
    - 홈페이지와 기능은 동일하지만 스크랩된 기사가 없을 시, 홈으로 이동하는 버튼을 렌더합니다.
    - 스크랩

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
