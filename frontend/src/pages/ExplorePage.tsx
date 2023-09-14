import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import empty from '/src/assets/empty.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import { Link } from 'react-router-dom';

const BarContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
`;

const MenuBar = styled.nav`
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

const ProfileBox = styled.button`
  display: flex;
  border-radius: 10px;
  background-color: #9c8379;
  padding: 1vw;
  cursor: pointer;
`;

const FilterBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  left: 0;
  padding: 1vw;
  background-color: white;
`;

const ToiletsList = styled.section`
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 170px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 2%;
  padding: 1vw;
`;

const ToiletCard = styled.div`
  padding: 2%;
  flex-grow: 1;
  flex-basis: 16%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
`;

const ToiletCardImage = styled.img`
  object-position: center;
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 5%;
  z-index: -1;
  align-self: center;
`;

const ToiletCardNameRating = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToiletCardInfo = styled.div`
  display: block;
  color: gray;
`;

const ToiletCardName = styled.div`
  display: inline-block;
  margin-top: auto;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  font-size: 20px;
`;

const ToiletCardRating = styled.div`
  display: inline-block;
  margin-top: auto;
  font-size: 18px;
`;

const DropDownProfile = styled.div`
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

const OverlayFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupFilter = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  position: relative;
`;

const ButtonContainer = styled.div`
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
`;

const ExplorePage = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gender, setGender] = useState<string>('');
  const [locations, setLocations] = useState<{ [key: string]: boolean }>({});

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setLocations((prev) => ({ ...prev, [name]: checked }));
  };

  const clearAllFilters = () => {
    setGender('');
    setLocations({});
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  interface Props {
    onClose: () => void;
  }

  const FilterPopup: React.FC<Props> = ({ onClose }) => {
    return (
      <OverlayFilter onClick={onClose}>
        <PopupFilter onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <h3>Gender</h3>
          <label>
            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" checked={gender === 'other'} onChange={handleGenderChange} />
            Other
          </label>

          <h3>Locations</h3>
          {['Main Library', 'Red Centre', 'Ainsworth', 'Matthews', 'Law Library'].map((location) => (
            <label key={location}>
              <input type="checkbox" name={location} checked={locations[location] || false} onChange={handleLocationChange} />
              {location}
            </label>
          ))}
          <ButtonContainer>
            <button onClick={clearAllFilters}>Clear All Filters</button>
          </ButtonContainer>
        </PopupFilter>
      </OverlayFilter>
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  type Action = 'Profile' | 'Settings' | 'Logout';

  const handleItemClick = (action: Action) => {
    switch (action) {
      case 'Profile':
        console.log('Navigating to profile...');
        break;
      case 'Settings':
        console.log('Navigating to settings...');
        break;
      case 'Logout':
        console.log('Logging out...');
        break;
    }

    setOpenProfile(false);
  };

  const languageTrue = () => {
    setLanguageOpen(true);
  };

  const languageFalse = () => {
    setLanguageOpen(false);
  };

  const [toilets, setToilets] = useState([
    {
      name: 'Toilet 1',
      imageURL: 'clown.jpg',
      rating: '4.83',
      building: 'Ainsworth',
      floor: 'Floor 2',
    },
    {
      name: 'Toilet 1',
      imageURL: 'clown.jpg',
      rating: '3.20',
      building: 'Quadrangle',
      floor: 'Ground Floor',
    },
    {
      name: 'Toilet 1',
      imageURL: 'clown.jpg',
      rating: '1.34',
      building: 'Main Library',
      floor: 'Floor 4',
    },
    {
      name: 'Toilet 1',
      imageURL: 'clown.jpg',
      rating: '4.94',
      building: 'Ainsworth',
      floor: 'Floor 3',
    },
    {
      name: 'Toilet 1',
      imageURL: 'clown.jpg',
      rating: '4.12',
      building: 'Law Library',
      floor: 'Floor 1',
    },
  ]);
  const remainder = 4 - (toilets.length % 4);

  console.log(remainder);
  console.log(toilets.length);

  const arr = [];
  for (let i = 0; i < remainder; i++) {
    const emptyToilet = { name: '', imageURL: empty };
    arr.push(emptyToilet);
  }

  return (
    <>
      <BarContainer>
        <MenuBar>
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
                <div onClick={() => handleItemClick('Settings')}>Settings</div>
                <div onClick={() => handleItemClick('Logout')}>Logout</div>
              </DropDownProfile>
            )}
          </ProfileBox>
        </MenuBar>

        <FilterBar>
          <div className="sort" style={{ display: 'inline-block' }}>
            <SortIcon style={{ cursor: 'pointer' }} onClick={() => setIsFilterOpen(true)}>
              Open Filters
            </SortIcon>
            {isFilterOpen && <FilterPopup onClose={() => setIsFilterOpen(false)} />}
          </div>
        </FilterBar>
      </BarContainer>

      <ToiletsList>
        {toilets.map((toilet) => (
          <ToiletCard>
            <ToiletCardImage src={'/src/assets/' + toilet['imageURL']}></ToiletCardImage>
            <ToiletCardNameRating>
              <ToiletCardName>{toilet['name']}</ToiletCardName>
              <ToiletCardRating>💩 {toilet['rating']}</ToiletCardRating>
            </ToiletCardNameRating>
            <ToiletCardInfo>{toilet['building']}</ToiletCardInfo>
            <ToiletCardInfo>{toilet['floor']}</ToiletCardInfo>
          </ToiletCard>
        ))}
        {arr.map((toilet) => (
          <ToiletCard>
            <ToiletCardImage src={empty}></ToiletCardImage>
            {toilet['name']}
          </ToiletCard>
        ))}
      </ToiletsList>
    </>
  );
};

export default ExplorePage;
