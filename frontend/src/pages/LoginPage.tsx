import styled from 'styled-components';
import logo from '/src/assets/goodshittrans.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  text-indent: 10px;
  font-size: 20px;
  outline-color: #a18276;

  &:hover {
    background-color: #E7E7E7;
    transition: background-color 0.3s
  }
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

const FindBtn = styled.button`
  background-color: #a18276;
  color: white;
  border: none;
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

const Spacing = styled.div`
  height: 100px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
`

const Register = styled.p`
  color: #a18276;
`;

const RegisterBtn = styled(Link)`
  color: #a18276;
`;

const LoginPage = () => {
  const [userForm, setUserForm] = useState({
    password: '',
    email: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6969/auth/login', userForm);
      console.log('Success', response.data);
      window.history.back()
    } catch (rawError) {
      const err = rawError as AxiosError;
      setErrorMessage(err.response.data.error)
      if (err.response && err.response.data) {
        console.error('Server responded with:', err.response.data);
        setError('Incorrect login data. Please try again.');
      } else {
        console.error('Error', err);
        setError('Incorrect login data. Please try again.');
      }
    }


  };

  return (
    <body style={{margin: '0', padding: '0'}}>
      <StyledBackground/>
      <BackBtn onClick={() => window.history.back()}><ArrowBackIcon></ArrowBackIcon></BackBtn>
      <Center>
        <Lines onSubmit={handleSubmit}>
          <img src={logo} onClick={() => navigate("/explore")}/>
          <Input type="text" name="email" placeholder="Email" onChange={handleChange}></Input>
          <Input type="text" name="password" placeholder="Password" onChange={handleChange}></Input>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <FindBtn type="submit">Login</FindBtn>
          {errorMessage !== '' &&<ErrorMessage>{errorMessage}</ErrorMessage>}
          <Spacing></Spacing>
          <Register>
            Don't have an account? <RegisterBtn to="/register">Register</RegisterBtn>
          </Register>
        </Lines>
      </Center>
    </body>
  );
};

export default LoginPage;
