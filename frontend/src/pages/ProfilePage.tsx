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
  overflow: hidden;
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
  margin-left: 12.5vh;
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

const ProfilePictureContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 35vh;
`;

const UpdatePhotoButton = styled('button')`
  background-color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
  font-weight: bold;
`;

const ReviewButton = styled('button')`
  margin-top: 20px;
`;

const FavoritesContainer = styled('div')``;

const FavoritesHeader = styled('div')``;

const FavoritesList = styled('div')`
  background-color: gray;
  height: 40vh;
  width: 40vh;
`;

const ProfilePage = () => {
  return (
    <ProfileBackground>
      <Banner></Banner>
      <ProfileContainer>
        <ProfilePictureContainer>
          <ProfilePicture></ProfilePicture>
          <UpdatePhotoButton>Update Photo</UpdatePhotoButton>
          <ReviewButton>3 Reviews</ReviewButton>
        </ProfilePictureContainer>
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
      <FavoritesContainer>
        <FavoritesHeader>Favorites</FavoritesHeader>
        <FavoritesList></FavoritesList>
      </FavoritesContainer>
    </ProfileBackground>
  );
};

export default ProfilePage;
