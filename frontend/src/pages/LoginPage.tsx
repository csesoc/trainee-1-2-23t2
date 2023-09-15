import styled from 'styled-components';
import logo from '../../public/logo.png';

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Lines = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: rgb(161, 130, 118, 0.1);
  color: #a18276;
  border: none;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 13px grey;
  margin: 20px;
  width: 450px;
  height: 50px;
`;

const FindBtn = styled.button`
  background-color: #a18276;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 60px 10px 60px;
  box-shadow: 0px 4px 13px grey;
  display: flex;
  cursor: pointer;
  text-decoration: none;
  margin: 20px;
  width: 450px;
  height: 50px;
`;

const Spacing = styled.div`
  height: 100px;
  width: 100%;
`;

const Register = styled.p`
  color: #a18276;
`;

const RegisterBtn = styled.a`
  color: #a18276;
`;

const LoginPage = () => {
  fetch('/auth/login')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data != null) {
        console.log(data);
      }
    });
  return (
    <>
      <Center>
        <Lines>
          <img src={logo} />
          <Input type="text" name="Email" placeholder="Email"></Input>
          <Input type="text" name="Password" placeholder="Password"></Input>
          <FindBtn>Login</FindBtn>
          <Spacing></Spacing>
          <Register>
            Don't ahve <RegisterBtn href="/register">Register</RegisterBtn>
          </Register>
        </Lines>
      </Center>
    </>
  );
};

export default LoginPage;
