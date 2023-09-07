import styled from 'styled-components';
import pfp from '../images/poop-emoji.jpg';
import banner from '../images/banner.jpg';
import { useState } from 'react';

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

const Banner = styled('img')`
  background-color: gray;
  height: 20vh;
  width: 100%;
`;

const ProfileName = styled('div')`
  font-size: 20px;
  font-weight: bold;
`;

const ProfileContainer = styled('div')`
  display: flex;
  margin-top: 12.5px;
`;

const EditButton = styled('button')`
  display: flex;
  height: 30px;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #a18276;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SaveButton = styled('button')`
  display: flex;
  height: 30px;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #dadada;
  color: #a18276;
  border: none;
  margin-left: 5vh;
  border-radius: 10px;
  cursor: pointer;
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

const FavoritesHeader = styled('h1')`
  margin: 0;
`;

const FavoritesList = styled('div')`
  background-color: gray;
  height: 40vh;
  width: 40vh;
`;

const EditPopUp = styled('div')`
  background-color: gray;
  position: fixed;
  height: 80vh;
  width: 60vh;
  display: flex;
  top: 50%;
  left: 50%;
  margin-top: -40vh;
  margin-left: -30vh;
`;

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const editClick = () => {
    setShowEditProfile(true);
    console.log('hello');
  };

  return (
    <ProfileBackground>
      {showEditProfile && <EditPopUp></EditPopUp>}
      <Banner src={banner}></Banner>
      <ProfileContainer>
        <ProfilePictureContainer>
          <ProfilePicture src={pfp}></ProfilePicture>
          <UpdatePhotoButton>Update Photo</UpdatePhotoButton>
          <ReviewButton>3 Reviews</ReviewButton>
        </ProfilePictureContainer>
        <DescriptionButtonContainer>
          <NameBioContainer>
            <ProfileName>Name</ProfileName>
            <Bio>Bio Something Something</Bio>
          </NameBioContainer>
          <ButtonContainer>
            <EditButton onClick={editClick}>Edit</EditButton>
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
