<div align="center">

# 팬하나 (FANHANA)
엘리스 2차 팀 프로젝트 
 
![fanhana](https://github.com/ji-silver/Blog/assets/59919953/9365681c-6c5a-4760-9252-2b2675e36507)

</div>



## 🗒️ 프로젝트 기획
국내 스포츠(K리그, KBO, LoL)팬을 위한 세상에 단 하나뿐인 스포츠 커뮤니티 팬하나(FANHANA)<br />
다양한 스포츠 종목과 관련된 경기 정보를 보여줄 수 있는 웹사이트로 공통의 관심사를 가진 스포츠 팬들이 자유롭게 소통할 수 있도록 커뮤니티 기능을 제공합니다.
- 커뮤니티 CRUD 기능(게시글, 댓글, 쇼츠), 각 스포츠들의 경기 일정과 순위 보여주기
- 크롤링을 통해 경기 일정, 순위 데이터 가져오고, 경기가 있는 날을 바탕으로 경기장 위치 확인하기

<br />

## 👩‍👩‍👧‍👦 멤버 구성 (기여도)
FE 6명, BE 2명 (FE 기여도 20%)
<img width="1345" alt="team" src="https://github.com/ji-silver/Blog/assets/59919953/22cd7e4d-21d6-434f-a6fa-94f06063471b">


<br />

## 📅 개발 기간
2023/05/29 ~ 2023/06/16

<br />

## Skils
![250817006-eee93cbd-2e29-4350-bcc3-7723c0038c3d](https://github.com/ji-silver/Player/assets/59919953/e47a7d43-5bbe-4b49-8a06-19828561d948)

<br />

## ERD - MySQL
<img width="1314" alt="스크린샷 2023-10-13 오후 4 18 copy" src="https://github.com/ji-silver/Blog/assets/59919953/950d0194-70bd-4b6e-8ff6-56d7ccb63a68">


<br />

## 📌 주요 기능
### 1. 순위 페이지
|모바일|웹|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/8f4ab412-02b3-4012-b080-5800460665ce" width="auto" height="600"/>|<img src="https://github.com/ji-silver/Player/assets/59919953/ca70325e-916e-4a40-88ef-1da782fcc273" width="600" height="auto"/>|

- custom hook을 정의하여 axios를 이용한 백엔드에서 API 통신하여 응답 데이터를 각 스포츠 특성에 맞게 데이터 가공 (승률, 득점차, 게임차 계산 후 순위 정렬) 했습니다.
- 시즌을 선택하면 그 시즌에 해당하는 순위 데이터 다시 가져오는 reFetch 함수를 구현하여 랭킹 데이터를 업데이트할 수 있습니다.
- 비슷한 컴포넌트들은 분리하여 재사용 가능한 구성요소로 구현하였고, Media Query, react-responsive 라이브러리를 이용한 반응형을 구현했습니다.

<br />

### 2. 게시판 페이지
![ezgif com-video-to-gif (6)](https://github.com/ji-silver/Player/assets/59919953/067dbad8-cd89-4214-826c-f59d69c26ac4)


- 백엔드와의 API 통신을 통해 게시글 및 댓글의 CRUD 기능을 구현하였습니다.
- 페이지네이션 기능을 구현하여 사용자가 다량의 게시물을 효과적으로 관리할 수 있도록 설계하였습니다.
- 로그인한 사용자에게만 게시글 작성 권한을 부여하기 위해 Popup 모달 컴포넌트를 활용하여 로그인을 유도하도록 구현하였습니다.

<br />
  
### 3. Open API 활용
|경기장 위치|날씨|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/558a5bcf-6f95-4d42-ae52-edf93dcf703a" width="500" height="auto" />|<img src="https://github.com/ji-silver/Player/assets/59919953/6540f29f-835d-4e76-8163-e9a838e29627" width="auto" height="250" />|

- kakaoMap API, openweathermap API를 이용하여 경기장 위치 및 날씨 정보를 구현하는 기능을 구현하였습니다.
- 날씨는 사용자의 위치 정보(경도, 위도)를 기반으로 API 호출하여 실시간 날씨 정보를 표시합니다.
- 날씨 정보를 가져오는 과정에서 로딩 상태에 따른 조건부 UI 렌더링을 구현하여 사용자에게 로딩중임을 알려주어 사용자 경험을 향상시킵니다.
- 경기장의 위치 정보는 일정 페이지에서 넘어온 경우 해당하는 경기장을 보여주고, 헤더에서 넘어온 경우 오늘 진행되는 경기의 경기장 모두 보여주어 분기 처리됩니다.

