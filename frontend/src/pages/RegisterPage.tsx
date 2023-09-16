import styled from 'styled-components';
import logo from '../../public/logo.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Lines = styled.form`
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

const RegisterPage = () => {
  const [userForm, setUserForm] = useState({
    name: '',
    password: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6969/auth/register', userForm);
      console.log('Success', response.data);
    } catch (err) {
      console.error('Error', err);
    }
  };

  return (
    <>
      <Center>
        <Lines onSubmit={handleSubmit}>
          <img src={logo} />
          <Input type="text" name="email" placeholder="Email" onChange={handleChange}></Input>
          <Input type="text" name="password" placeholder="Password" onChange={handleChange}></Input>
          <Input type="text" name="name" placeholder="Name" onChange={handleChange}></Input>
          <FindBtn type="submit">Login</FindBtn>
          <Spacing></Spacing>
          <Register>
            Don't ahve <RegisterBtn href="/register">Register</RegisterBtn>
          </Register>
        </Lines>
      </Center>
    </>
  );
};

export default RegisterPage;
