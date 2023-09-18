## BrowserRouter

- Link는 Router 내부에 있어야 동작한다.

## createBrowserRouter

- 라우터를 array 형식으로 보여줄 수 있다 (장점!)

# errorElement

- 잘못된 라우터 주소로 접근하거나, 오류가 발생할 때 이동한다.

# useNavigate

- 유저를 어딘가로 보내는 기능을 가진다.
- 유저를 어딘가로 이동시키는 방법은 두가지이다. Link, useNavigate
- Link는 유저가 클릭을 해야 한다.
- 클릭을 기다리지 않고 유저를 이동시키는 방법은 useNavigate이다. (v5애서는 location.push)
- redirect 하거나 권한이 없는 유저를 이동시킬 때 사용한다.
