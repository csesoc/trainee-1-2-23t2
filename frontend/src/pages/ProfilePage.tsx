import styled from 'styled-components';

const ProfilePicture = styled('img')`
  background-color: black;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-top: -60px;
`;

const ProfileBackground = styled('div')`
  height: 100vh;
`;

const Banner = styled('div')`
  background-color: gray;
  height: 20vh;
`;

const ProfileName = styled('div')`
  font-size: 20px;
`;

const ProfileContainer = styled('div')`
  display: flex;
`;

const EditButton = styled('button')`
  display: flex;
  height: 30px;
  width: 50px;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled('button')`
  display: flex;
  height: 30px;
  width: 50px;
  align-items: center;
  justify-content: center;
`;

const NameBioContainer = styled('div')`
  margin-left: 30px;
`;

const Bio = styled('div')`
  font-size: 15px;
`;

const DescriptionButtonContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonContainer = styled('div')`
  display: flex;
`;

const ProfilePage = () => {
  return (
    <ProfileBackground>
      <Banner></Banner>
      <ProfileContainer>
        <ProfilePicture></ProfilePicture>
        <DescriptionButtonContainer>
          <NameBioContainer>
            <ProfileName>Name</ProfileName>
            <Bio>Bio Something Something</Bio>
          </NameBioContainer>
          <ButtonContainer>
            <EditButton>Edit</EditButton>
            <SaveButton>Save</SaveButton>
          </ButtonContainer>
        </DescriptionButtonContainer>
      </ProfileContainer>
    </ProfileBackground>
  );
};

export default ProfilePage;
