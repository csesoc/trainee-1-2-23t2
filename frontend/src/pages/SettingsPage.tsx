import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Center = styled.div`
  position: absolute;
  display: flex;
  gap: 5%;
  top: 50%;
  left: 50%;
  width: 65vw;
  height: 65vh;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
`;

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

const SettingsOptions = styled.div`
    width: 30%;
    height: 90%;  
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`

const IndividualSettingOption = styled.div`
    color: gray;
    font-size: 30px;
`

const ImageBox = styled.img`
    width: 300px;
    height: auto;
`

const SettingsPage = () => {
    return (
        <>
            <StyledBackground/>
            <BackBtn onClick={() => window.history.back()}><ArrowBackIcon></ArrowBackIcon></BackBtn>
            <Center>
                <SettingsOptions>
                    <IndividualSettingOption>Languages</IndividualSettingOption>
                    <IndividualSettingOption>Display Settings</IndividualSettingOption>
                </SettingsOptions>
                <ImageBox src={'/src/assets/robbery1.jpg'}></ImageBox>
                <ImageBox src={'/src/assets/robbery2.jpg'}></ImageBox>
            </Center>
        </>
    )
}

export default SettingsPage;