import styled from 'styled-components';
import logo from '/src/assets/goodshittrans.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const StyledBackground = styled.div`
  background-image: url('/src/assets/whiteness.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const BackBtn = styled.button`
  background-color: #a18276;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 60px 10px 60px;
  box-shadow: 0px 4px 13px grey;
  cursor: pointer;
  text-decoration: none;
  margin: 20px;
  width: 9vw;
  height: 6vh;
  text-align: center;
  font-size: 15px;

  &:hover {
    background-color: #C19D8F;
    transition: background-color 0.3s
  }
`

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
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0px 4px 13px grey;
  margin: 20px;
  width: 450px;
  height: 50px;

  &:hover {
    background-color: #E7E7E7;
    transition: background-color 0.3s
  }
`;

const FindBtn = styled.button`
  background-color: #a18276;
  color: white;
  border: none;
  border-radius: 15px;
  border-radius: 15px;
  padding: 10px 60px 10px 60px;
  box-shadow: 0px 4px 13px grey;
  cursor: pointer;
  text-decoration: none;
  margin: 20px;
  width: 472px;
  height: 70px;
  text-align: center;
  font-size: 30px;

  &:hover {
    background-color: #C19D8F;
    transition: background-color 0.3s
  }
`;

const ImageBox = styled.img`
  width: 600px;
  height: auto;
`

const ErrorMessage = styled.div`
  color: red;
`

const Spacing = styled.div`
  height: 50px;
  width: 100%;
`;

const Register = styled.p`
  color: #a18276;
`;

const RegisterBtn = styled.a`
  color: #a18276;
`;

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [userForm, setUserForm] = useState({
    name: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6969/auth/register', userForm);
      console.log('Success', response.data);
      navigate('/');
    } catch (rawError) {
      const err = rawError as AxiosError;
      setErrorMessage(err.response.data.error)
      if (err.response && err.response.data) {
        console.error('Server responded with:', err.response.data);
      } else {
        console.error('Error', err);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <StyledBackground/>
      <BackBtn onClick={() => navigate("/")}><HomeIcon></HomeIcon></BackBtn>
      <Center>
        <Lines onSubmit={handleSubmit}>
          <ImageBox src={logo} onClick={() => window.history.back()}/>
          <Input type="text" name="email" placeholder="Email" onChange={handleChange}></Input>
          <Input type="password" name="password" placeholder="Password" onChange={handleChange}></Input>
          <Input type="text" name="name" placeholder="Name" onChange={handleChange}></Input>
          {errorMessage !== '' &&<ErrorMessage>{errorMessage}</ErrorMessage>}
          <FindBtn type="submit">Register</FindBtn>
          <Spacing></Spacing>
          <Register>
            Already got an account? <RegisterBtn href="/login">Login</RegisterBtn>
          </Register>
        </Lines>
      </Center>
    </>
  );
};

export default RegisterPage;
