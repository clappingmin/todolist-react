import './Root.scss';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import styled from 'styled-components';

function Root() {
  return (
    <div className="wrapper">
      <div className="phone-wrapper">
        <Container>
          <Outlet />
        </Container>
        <NavigationBar />
      </div>
    </div>
  );
}

const Container = styled.div`
  height: 100%;
`;

export default Root;
