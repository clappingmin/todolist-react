import { useUserItemFromServer } from "../../store/user.store";

export const TestPage2 = () => {
  const userDetailAtom = useUserItemFromServer()
  // return <div><p>status : {statusAtom.status}</p><p>data : {JSON.stringify(statusAtom.data)}</p></div>;
  // const [_,userDetailAtom] = useUserItemFromServer(idAtom)
  return (
  <div>
    <p>status : {userDetailAtom.status}</p>
    <p>data : {JSON.stringify(userDetailAtom.data)}</p>
  </div>
  );
};