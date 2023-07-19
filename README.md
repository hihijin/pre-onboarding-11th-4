# 원티드 프리온보딩 프론트엔드 인턴십 - 4주차 개인 과제

> [한국임상정보](https://clinicaltrialskorea.com/) 홈페이지 검색창 및 검색어 추천 구현, 캐싱 구현
>
> 프로젝트 기간 : 2023년 7월 17일 ~ 2023년 7월 19일
>
> #### [배포링크](https://clinicaltrialskorea-search.netlify.app/)

</br>

## 📖 목차

- [실행 방법](#%EF%B8%8F-실행-방법)
- [요구 사항](#%EF%B8%8F-요구사항)
- [코드 컨벤션](#-코드-컨벤션)
- [사용 기술](#-사용-기술)
- [폴더 구조](#폴더-구조)

</br>

## ⌨️ 실행 방법

```zsh
$ git clone https://github.com/pre-onboarding-frontend-7-team-3/pre-onboarding-7th-3-1-3.git
$ npm install
$ npm start
```

- API 서버 별도 실행
https://github.com/walking-sunset/assignment-api
```
$ git clone https://github.com/walking-sunset/assignment-api.git
$ npm install
$ npm run start
```

</br>


## ☑️ 요구사항

### 1. 언어 선택 - TypeScript

- [ ] TypeScript는 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있습니다. 코드의 `가독성`을 높이고 예측할 수 있게 하며 `디버깅`이 쉽다는 장점으로 채택했습니다.

<br/>

### 2. API 호출 최적화

- 서버에 대한 API 호출 최적화를 위해 응답으로 받은 데이터는 `캐싱` 처리하고 비동기 호출 횟수의 단축을 위해 `디바운싱` 처리했습니다.
- [ ] 2-1. API 호출별로 로컬 캐싱과 empireTime에 따른 캐싱 삭제

  - [ ] 클라이언트에서 디바운싱 시간을 이탈하여 API 호출을 이룰 때마다, 캐시 스토리지에 데이터를 저장합니다.

  - [ ] 후에 클라이언트에서 다시 API 호출을 하기 전, 서버로 보낼 `쿼리 스트링`을 캐시 스토리지에 저장된 `캐시 object key`를 비교하여 일치하는 캐시 데이터의 필요 부분을 추출하여 관련 검색어를 출력하였고, 일치하지 않을 때(캐시 처리된 데이터가 없는 경우) 서버에 다시 API 요청을 보내고 캐싱하는 방식으로 구현했습니다.
     
  - [ ] 데이터를 캐시 스토리지에 저장할 때 newDate().getTime()으로 `timestamp라는 캐시 object key`를 추가합니다. 캐시데이터가 업데이트 될 때마다 현재 시간과 각 캐시데이터의 timestamp를 뺀 시간이 설정한 시간(1분)을 넘었다면 캐시 스토리지에 해당 데이터가 삭제됩니다.(moment.js 라이브러리를 사용하지 않고 구현했습니다.)


https://github.com/hihijin/pre-onboarding-11th-4/assets/117073214/323b1de9-9983-49dc-8e3c-796c92a3870c

<img width="677" alt="image" src="https://github.com/hihijin/pre-onboarding-11th-4/assets/117073214/232e080f-4896-4354-aff1-283df47fae51">

  https://github.com/hihijin/pre-onboarding-11th-4/blob/5d1cfba2a2f5f1644fe3bb05f9c17b05b03829c4/src/hooks/useFetch.ts

  

<br/>

- [ ] 2-2. API 호출 횟수 최적화

  - [ ] 검색창에 검색어를 입력했을 때 onChange 이벤트가 발생할 때마다 서버에 GET 요청을 보내는 것은 비효율적인 프로세스라고 생각했습니다.

  - [ ] 따라서 첫 onChange 이벤트의 발생 시점으로부터 의도적인 `지연시간`을 두어 API 호출 횟수를 줄였습니다.

  - [ ] 검색창의 onChange 이벤트가 비동기적으로 input의 상태 값을 업데이트하되, 사용자가 입력한 검색 결과에 대한 비동기 요청은 `디바운싱 함수`에서 설정한 시간(600ms)이 지난 뒤에 최종적으로 업데이트된 상태 값을 쿼리 스트링으로 보내 호출되게 구현했습니다.

  ![3-1 디바운싱 후](https://github.com/hihijin/pre-onboarding-11th-4/assets/117073214/bfe7114b-b7a0-4629-adae-9fa190557e2d)


  https://github.com/hihijin/pre-onboarding-11th-4/blob/5d1cfba2a2f5f1644fe3bb05f9c17b05b03829c4/src/hooks/useDebounce.ts

  https://github.com/hihijin/pre-onboarding-11th-4/blob/5d1cfba2a2f5f1644fe3bb05f9c17b05b03829c4/src/hooks/useDeleteCache.ts

<br/>

### 3. 키보드만으로 추천 검색어들로 이동 가능한 UX 구축

- [ ] 사용자가 추천 검색어 간 `키 이벤트`(ArrowUp, ArrowDown)로 자유롭게 이동할 수 있게 구현했습니다.

- [ ] 검색창 이동 간 선택된 검색어는 하이라이트 처리로 UI를 구성했고 검색 목록 하단에 도달했을 때 ArrowUp, ArrowDown 이벤트에는 자동으로 목록 내 검색어 위치로 따라가도록 구현했습니다.

- [ ] 일반적인 사용자 검색 유형을 고려하여 페이지를 다시 돌아오거나 새로고침 했을 시에도 최근 검색어가 유지되도록 구현하였습니다. onKeyDown 이벤트가 발생했을 때 호출되는 함수는 커스텀 훅으로 분리하여 뷰 단에서의 로직을 최소화하고자 노력했습니다.
  

<br/>

### 4. 검색어가 없을 시 “검색어 없음” 표출

<img width="614" alt="image" src="https://github.com/hihijin/pre-onboarding-11th-4/assets/117073214/fc83070d-b2cf-4e47-a9e2-37fc753c021a">

<br/>

### 5. API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
<img width="680" alt="image" src="https://github.com/hihijin/pre-onboarding-11th-4/assets/117073214/55ecb5e2-3bed-4b86-bd5f-1351b8a5a2a7">

<br/>

## 🔒 코드 컨벤션

- git commit message

| 커밋명   | 내용                                        |
| -------- | ------------------------------------------- |
| Feat     | 파일, 폴더, 새로운 기능 추가                |
| Fix      | 버그 수정                                   |
| Docs     | 제품 코드 수정 없음                         |
| Design   | 디자인, 레이아웃 관련             |
| Refactor | 코드 리팩토링                               |
| init     | 초기 설정, 세팅                            |
| Chore    | 환경설정, 빌드 업무, 패키지 매니저 설정등.. |
| Hotfix   | 치명적이거나 급한 버그 수정                 |
| Remove   | 사용하지 않는 변수, 파일 etc 삭제           |

</br>

## 🔨 사용 기술

<img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26?&style=flat&logo=HTML5&logoColor=white"/> <img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6?&style=flat&logo=CSS3&logoColor=white"/> <img alt="React" src ="https://img.shields.io/badge/React-61DAFB?&style=flat&logo=React&logoColor=white"/> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-blue?style=flat&logo=TypeScript&logoColor=white"/>

<img alt="styled-components" src ="https://img.shields.io/badge/styled components-DB7093?&style=flat&logo=styled-components&logoColor=white"/>

<img alt="Git" src ="https://img.shields.io/badge/Git-F05032?&style=flat&logo=Git&logoColor=white"/> <img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717?&style=flat&logo=GitHub&logoColor=white"/> 
</br>

## 📦 폴더 구조

```
📂 src
  ├─ App.tsx
  ├─ components
  │  ├─ Form.tsx
  │  ├─ SearchContainer.tsx
  │  └─ Title.tsx
  ├─ Global.css
  ├─ hooks
  │  ├─ useDebounce.ts
  │  ├─ useDeleteCache.ts
  │  └─ useFetch.ts
  ├─ index.tsx
  ├─ page
  │  └─ MainPage.tsx
  ├─ react-app-env.d.ts
  ├─ type
  │  └─ cacheDataType.ts
  └─ utills
     └─ customAPI.ts
```

</br>
