import { PrimaryBtn } from '../styles/GlobalStyles';
import styled, { keyframes } from 'styled-components'
import logo from '/src/assets/goodshittrans.png';
import { useNavigate } from 'react-router-dom';

const StyledBackground = styled.div`
  background-image: url('/src/assets/whiteness.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -100;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: end;  
  padding: 10px;
`

const Lines = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`

const ToiletBtn = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15%;
`

const FindBtn = styled.a`
    background-color: #a18276;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px 60px 10px 60px;
    box-shadow: 0px 4px 13px grey;
    display: flex;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      background-color: #C19D8F;
      transition: background-color 0.3s
    }
`

const BtnLogin = styled.div`
  font-size: 1.2em;
  padding-left: 5px;
  z-index: 1000;
`

const BtnText = styled.div`
  font-size: 2em;
`

const LandingPage = () => {
  const navigate = useNavigate();

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const cookie = getCookie('token');

  const handleChange = () => {
    if (!cookie) {
      navigate('/login');
    }
  }

  console.log(getCookie('token'));
  return (
    <>
      <StyledBackground/>
      <TopHeader>
        <PrimaryBtn onClick={()=>handleChange()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
          </svg> 
          <BtnLogin>Login</BtnLogin>
        </PrimaryBtn>      
      </TopHeader>
      <Center>
        <Lines>
          <img src={logo}/>
          <h2>Finding your Perfect Shit</h2>
        </Lines>
        <ToiletBtn>
        <FindBtn href = "/explore">
          <BtnText>Find your toilet</BtnText>
        </FindBtn>
        </ToiletBtn>
      </Center>
    </>
  )
}

export default LandingPage;