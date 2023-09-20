import { users } from '../../db';
import { Link, useSearchParams } from 'react-router-dom';

function HomePage() {
  const [readSearhParams, setSearhParams] = useSearchParams();

  // console.log(readSearhParams.has('geo'), readSearhParams.get('geo'));

  setTimeout(() => {
    setSearhParams({
      day: 'today',
      geo: '999',
      tomorrow: 'false',
    });
  }, 300);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <div>
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
