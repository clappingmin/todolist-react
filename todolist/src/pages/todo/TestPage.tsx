// import { useUserItemFromList } from "../../store/todo.store";

import { useUserItemFromList } from "../../store/user.store";


export const TestPage = () => {
  const userdata = useUserItemFromList(1);
  return (
  <div>
    <p>status : {userdata.status}</p>
    <p>data : {JSON.stringify(userdata.data)}</p>
    <p>error : {JSON.stringify(userdata.error?.message??'')}</p>
  </div>
  );
}