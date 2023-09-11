import styled from 'styled-components';
import pfp from '../images/poop-emoji.jpg';
import banner from '../images/banner.jpg';
import favorite from '../images/favorite.webp';
import { useState, useRef, useEffect } from 'react';

type ProfileBannerContainerProps = {
  isBlurred: boolean;
};

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

const ProfileBannerContainer = styled.div<ProfileBannerContainerProps>`
  opacity: ${({ isBlurred }) => (isBlurred ? '0.2' : '1')};
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
  background-color: white;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
`;

const FavoritesSection = styled('div')``;

const FavoritesCard = styled('div')``;

const FavoritesText = styled('div')`
  height: 10px;
  width: 10px;
`;
const FavoritesHeader = styled('h1')`
  margin: 0;
`;

const FavoritesImg = styled('img')`
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
  const [profilePicture, setProfilePicture] = useState(pfp);

  const fileIputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (fileIputRef.current) {
      fileIputRef.current.click();
    }
  }, []);

  const openClick = () => {
    setShowEditProfile(true);
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

  const onChangeEditBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditBio(event.target.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setProfilePicture(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <ProfileBackground>
      <ProfileBannerContainer isBlurred={showEditProfile}>
        <Banner src={banner}></Banner>
        <ProfileContainer>
          <ProfilePictureContainer>
            <ProfilePicture src={profilePicture}></ProfilePicture>
            <input type="file" onChange={onFileChange} style={{ display: 'none' }} ref={fileIputRef}></input>
            <UpdatePhotoButton
              onClick={(e) => {
                const buttonElement = e.target as HTMLElement;
                const fileInputElement = buttonElement.previousSibling as HTMLInputElement;
                fileInputElement.click();
              }}
            >
              Update Photo
            </UpdatePhotoButton>
            <ReviewButton>3 Reviews</ReviewButton>
          </ProfilePictureContainer>
          <DescriptionButtonContainer>
            <NameBioContainer>
              <ProfileName>{name}</ProfileName>
              <Bio>{bio}</Bio>
            </NameBioContainer>
            <ButtonContainer>
              <EditButton onClick={openClick}>Edit Profile</EditButton>
            </ButtonContainer>
          </DescriptionButtonContainer>
        </ProfileContainer>
        <FavoritesSection>
          <FavoritesHeader>Favorites</FavoritesHeader>
          <FavoritesCard>
            <FavoritesImg src={favorite}></FavoritesImg>
            <FavoritesText>Hello</FavoritesText>
          </FavoritesCard>
        </FavoritesSection>
      </ProfileBannerContainer>
      {showEditProfile && (
        <EditPopUp>
          <CloseEditPopUp onClick={closeEdit}>X</CloseEditPopUp>
          <EditProfileTextContainer>
            <div>Edit Profile</div>
          </EditProfileTextContainer>
          <div>Name</div>
          <EditNameForm value={editName} onChange={onChangeEditName}></EditNameForm>
          <div>Bio</div>
          <EditBioForm value={editBio} onChange={onChangeEditBio}></EditBioForm>
          <EditSaveButton onClick={saveEdit}>Save</EditSaveButton>
        </EditPopUp>
      )}
    </ProfileBackground>
  );
};

export default ProfilePage;
