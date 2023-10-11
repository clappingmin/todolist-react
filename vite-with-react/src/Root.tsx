import styles from './Root.module.scss';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import './styles/global.scss';

function Root() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.phone}>
        <div className={styles.container}>
          <Outlet />
        </div>
        <NavigationBar />
      </div>
    </div>
  );
}

export default Root;
