# todolist-react

# 1. 환경설정

```
npm i @chakra-ui/icons
npm i styled-reset // chakra UI 때문에 안해도 될 듯
npm install firebase
npm install jotai
npm install framer-motion
```

# 2. 폴더 구조

- components : 전역으로 사용할 컴포넌트 모아놓은 폴더
- pages : 페이지 모아놓은 폴더, 라우터로 구분함,
  라우터로 구분된 폴더 내에 components는 그 라우터에서만 사용할 컴포넌트만 모아놓음
- service : 서버, 데이터와 관련된 것들을 모아놓은 폴더
- shared : 공유하는 것들을 모아놓은 폴더
  - firebase : 파이어베이스 관련 파일 폴더
  - interfaces : 인터페이스 모아놓은 폴더
  - utils : 유틸리티 함수 모아놓은 폴더
  - hooks : 리액트 커스텀 훅 모아놓은 폴더
- store : 상태 관리 모아놓은 폴더
- syltes : 스타일 모아놓은 폴더
  - chakra : chakra 컴포넌트 별로 커스텀 셋팅 파일 모아놓은 폴더

# 3. Commit Message Convention

- feat : 새로운 기능에 대한 커밋
- fix : 버그 수정에 대한 커밋
- build : 빌드 관련 파일 수정에 대한 커밋
- chore : 그 외 자잘한 수정에 대한 커밋
- ci : CI관련 설정 수정에 대한 커밋
- docs : 문서 수정에 대한 커밋
- style : 코드 스타일 혹은 포맷 등에 관한 커밋
- refactor : 코드 리팩토링에 대한 커밋

# 4. style

- 전역 스타일은 styles/global.scss에 작성
- chakra ui 스타일은 컴포넌트 별로 각 파일에 작성
- css module 사용 (스타일 클래스 충돌 방지)
- 스타일 네이밍 규칙은 카멜 케이스 사용 (camelCase)
- 스타일 파일을 생성할 때는 사용할 컴포넌트와 이름을 통일 (ex. A.tsx -> A.module.scss)
- 글로벌 파일과 chakra ui 파일을 제외한 스타일 파일은 적용할 컴포넌트와 같은 위치에 생성

- global style과 모듈화 된 스타일 함께 사용하는 방법

```javascript
      <div className={`${styles.toonTitle} text-overflow-2`}>
```
