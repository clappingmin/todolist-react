# Router

## BrowserRouter

- Link는 Router 내부에 있어야 동작한다.

## createBrowserRouter

- 라우터를 array 형식으로 보여줄 수 있다 (장점!)

## errorElement

- 잘못된 라우터 주소로 접근하거나, 오류가 발생할 때 이동한다.

## useNavigate

- 유저를 어딘가로 보내는 기능을 가진다.
- 유저를 어딘가로 이동시키는 방법은 두가지이다. Link, useNavigate
- Link는 유저가 클릭을 해야 한다.
- 클릭을 기다리지 않고 유저를 이동시키는 방법은 useNavigate이다. (v5애서는 location.push)
- redirect 하거나 권한이 없는 유저를 이동시킬 때 사용한다.

## useParams

- 라우터에서 :userId를 가져올 때 사용한다.

## Outlet

- 부모 컴포넌트에 추가할 경우 그 부모 컴포넌트의 자식 컴포넌트를 보여줄 때 사용한다.
- **자식을 render할 때 사용함!!!!**
- 부모와 자식간의 데이터를 전달하는 방법으로 사용하는 방법 (1)

## useOutletContext

- 부모와 자식간의 데이터를 전달하는 방법으로 사용하는 방법 (2)
- context에 내가 원하는 무엇이든 보낼 수 있다 (array, number, string ...)
- Root에서 보내면 모든 페이지 컴포넌트에 보낼 수 있다. (ex. dark mode)

## 주의

- Link에 to 주소를 적을 때 '/'를 앞에 붙이면 root에서 붙인 주소로 이동한다
- 안붙일 경우 현재 주소 뒤에 추가로 주소가 붙는다
