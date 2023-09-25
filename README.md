# todolist-react

# 1. 환경설정

```
npm i @chakra-ui/icons
npm i styled-reset // chakra UI 때문에 안해도 될 듯
npm install firebase
npm install jotai
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
