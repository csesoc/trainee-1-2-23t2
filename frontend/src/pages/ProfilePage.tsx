import styled, { createGlobalStyle } from 'styled-components';
import pfp from '../images/poop-emoji.jpg';
import banner from '../images/banner.jpg';
import favorite from '../images/favorite.webp';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type ProfileBannerContainerProps = {
  isBlurred: boolean;
};

const GlobalStyle = createGlobalStyle`
  html, body {
    height: auto;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  div, p, a {
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const ProfilePicture = styled('img')`
  background-color: black;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-top: -60px;
  border: 3px solid black;
`;

const EditProfilePicture = styled('img')`
  background-color: black;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 3px solid black;
`;

const EditProfilePictureContainer = styled('div')`
  background-color; blue;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileBackground = styled('div')`
  height: 100%;
`;

const Banner = styled('img')`
  background-color: gray;
  height: 180px;
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
  margin-left: 30px;
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

const FavoritesSection = styled('div')`
  margin-left: 30px;
`;

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
  height: 60vh;
  width: 60vh;
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

const NavBar = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #9c8378;
  padding-right: 10vw;
  padding: 1vw;
  color: white;
  align-items: center;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const H1Style = styled(Link)`
  flex-grow: 1;
  display: inline-block;
  font-size: 2em;
  font-weight: 500;
  text-decoration: none;
  color: white;
`;

const ProfileBox = styled('button')`
  display: flex;
  border-radius: 10px;
  background-color: #9c8379;
  padding: 1vw;
  cursor: pointer;
`;

const DropDownProfile = styled('div')`
  position: absolute;
  top: 4.5rem;
  right: 1.5rem;
  width: 120px;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -0.7rem;
    right: 1.1rem;
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    background-color: white;
    border-left: 1px solid gray;
    border-top: 1px solid gray;
  }

  & > div,
  a {
    padding: 12px 15px;
    display: block;
    text-decoration: none;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #e9e9e9;
      color: #000;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
  }
`;

const BarContainer = styled('div')`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
`;

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [name, setName] = useState('Name');
  const [bio, setBio] = useState('Bio something something');
  const [profilePicture, setProfilePicture] = useState(pfp);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);
  const [editPfp, setEditPfp] = useState(profilePicture);

  const fileIputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    setProfilePicture(editPfp);
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
            setEditPfp(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const languageTrue = () => {
    setLanguageOpen(true);
  };

  const languageFalse = () => {
    setLanguageOpen(false);
  };

  return (
    <ProfileBackground>
      <GlobalStyle></GlobalStyle>
      <BarContainer>
        <NavBar>
          <H1Style to="/explore">Good Shit</H1Style>
          <div style={{ fontSize: '18px', fontWeight: 200 }}>Finding your Perfect Shit</div>
          <IconButton style={{ padding: '20px' }} onClick={languageTrue}>
            <LanguageIcon fontSize="large" style={{ cursor: 'pointer' }} />
          </IconButton>

          <Dialog open={languageOpen} onClose={languageFalse}>
            <DialogTitle>Select a language</DialogTitle>
            <DialogContent>English (your only option lmao)</DialogContent>
            <DialogActions>
              <Button onClick={languageFalse} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <ProfileBox onClick={() => setOpenProfile(!openProfile)}>
            <AccountCircleIcon fontSize="large" style={{ color: 'white' }} />
            {openProfile && (
              <DropDownProfile ref={dropdownRef}>
                <Link to="/profile">Profile</Link>
                <div>Settings</div>
                <div>Logout</div>
              </DropDownProfile>
            )}
          </ProfileBox>
        </NavBar>
      </BarContainer>

      <ProfileBannerContainer isBlurred={showEditProfile}>
        <Banner src={banner}></Banner>
        <ProfileContainer>
          <ProfilePictureContainer>
            <ProfilePicture src={profilePicture}></ProfilePicture>
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
          <div>Profile</div>
          <EditProfilePictureContainer>
            <EditProfilePicture src={editPfp}></EditProfilePicture>
            <input type="file" onChange={onFileChange} style={{ display: 'none' }}></input>
            <UpdatePhotoButton
              onClick={(e) => {
                const buttonElement = e.target as HTMLElement;
                const fileInputElement = buttonElement.previousSibling as HTMLInputElement;
                fileInputElement.click();
              }}
            >
              Update Photo
            </UpdatePhotoButton>
          </EditProfilePictureContainer>
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
