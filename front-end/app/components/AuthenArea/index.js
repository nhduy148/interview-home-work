import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
// import WrapAvatar from './WrapAvatar';
// import Avatar from './Avatar';
// import userIcon from './user-icon.png';
// import UserName from './UserName';
import Wrapper from './Wrapper';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

function AuthenArea() {
  const [loginFormShow, setLoginFormShow] = React.useState(false);
  const [registerFormShow, setRegisterFormShow] = React.useState(false);

  return (
    <Wrapper>
      {/* <WrapAvatar>
        <Avatar src={userIcon} />
      </WrapAvatar>
      <UserName>ABC</UserName> */}
      <ButtonGroup className="mb-2">
        <Button variant="secondary" onClick={() => setLoginFormShow(true)}>
          Login
        </Button>
        <Button variant="secondary" onClick={() => setRegisterFormShow(true)}>
          Register
        </Button>
      </ButtonGroup>

      <LoginForm show={loginFormShow} onHide={() => setLoginFormShow(false)} />

      <RegisterForm
        show={registerFormShow}
        onHide={() => setRegisterFormShow(false)}
      />
    </Wrapper>
  );
}

export default AuthenArea;
