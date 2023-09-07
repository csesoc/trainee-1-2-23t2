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
  background-color: white;
  position: fixed;
  height: 80vh;
  width: 80vh;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  margin-top: -40vh;
  margin-left: -40vh;
  padding: 10px;
  border: 2px solid;
  border-radius: 1%;
`;

const CloseEditPopUp = styled('div')`
  top: 0px;
  right: 0px;
  position: absolute;
  cursor: pointer;
  background-color: gray;
  border-radius: 50%;
  padding: 10px;
  width: 10px;
  height: 10px;
  border: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditNameForm = styled('input')`
  height: 3vh;
`;

const EditBioForm = styled('textarea')`
  height: 15vh;
`;

const EditProfileTextContainer = styled('div')`
  text-align: center;
  width: 100%;
`;

const EditSaveButton = styled('div')`
  display: flex;
  height: 30px;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #a18276;
  color: white;
  border: none;
  cursor: pointer;
  bottom: 0px;
  right: 0px;
  position: absolute;
`;

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [name, setName] = useState('Name');
  const [bio, setBio] = useState('Bio something something');

  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);

  const openClick = () => {
    setShowEditProfile(true);
    console.log('hello');
  };

  const closeEdit = () => {
    setShowEditProfile(false);
  };

  const saveEdit = () => {
    closeEdit();
    setName(editName);
    setBio(editBio);
  };

  const onChangeEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(event.target.value);
  };

  const onChangeEditBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditBio(event.target.value);
  };

  return (
    <ProfileBackground>
      {showEditProfile && (
        <EditPopUp>
          <CloseEditPopUp onClick={closeEdit}>X</CloseEditPopUp>
          <EditProfileTextContainer>
            <div>Edit Profile</div>
          </EditProfileTextContainer>
          <div>Name</div>
          <EditNameForm
            value={editName}
            onChange={onChangeEditName}
          ></EditNameForm>
          <div>Bio</div>
          <EditBioForm value={editBio} onChange={onChangeEditBio}></EditBioForm>
          <EditSaveButton onClick={saveEdit}>Save</EditSaveButton>
        </EditPopUp>
      )}
      <Banner src={banner}></Banner>
      <ProfileContainer>
        <ProfilePictureContainer>
          <ProfilePicture src={pfp}></ProfilePicture>
          <UpdatePhotoButton>Update Photo</UpdatePhotoButton>
          <ReviewButton>3 Reviews</ReviewButton>
        </ProfilePictureContainer>
        <DescriptionButtonContainer>
          <NameBioContainer>
            <ProfileName>{name}</ProfileName>
            <Bio>{bio}</Bio>
          </NameBioContainer>
          <ButtonContainer>
            <EditButton onClick={openClick}>Edit</EditButton>
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
