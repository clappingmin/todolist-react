import styled from 'styled-components';

function NavigationBar() {
  return (
    <Wrapper>
      <NaviBtn>
        <span className="material-icons">home</span>
        <p>Home</p>
      </NaviBtn>
      <NaviBtn>
        <span className="material-icons">calendar_month</span>
        <p>Calendar</p>
      </NaviBtn>
      <AddBtn>
        <span className="material-icons">add</span>
      </AddBtn>
      <NaviBtn>
        <span className="material-icons">pie_chart</span>
        <p>Charts</p>
      </NaviBtn>
      <NaviBtn>
        <span className="material-icons">person</span>
        <p>Profile</p>
      </NaviBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 70px;
  background: #2e3134;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 20px 0 0;
`;

const NaviBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  & > p {
    font-size: 12px;
  }
`;

const AddBtn = styled.button`
  width: 60px;
  height: 60px;
  background: #ffeb3b;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -30px;
  transition: all ease 0.7s;

  &:hover {
    transform: rotate(60deg);
  }
`;

export default NavigationBar;
