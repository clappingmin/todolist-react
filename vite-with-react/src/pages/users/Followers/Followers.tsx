import { useOutletContext } from 'react-router-dom';

interface IFollowersContext {
  nameOfMyUser: string;
}

function Followers() {
  const { nameOfMyUser } = useOutletContext<IFollowersContext>();
  console.log(nameOfMyUser);

  return <h1>Followers {nameOfMyUser}</h1>;
}

export default Followers;
