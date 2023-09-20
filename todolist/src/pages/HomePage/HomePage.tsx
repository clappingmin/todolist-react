import { users } from '../../db';
import { Link } from 'react-router-dom';

function HomePage() {
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
