import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react';
import empty from '/src/assets/empty.jpg';
import goodshitimg from '/src/assets/goodshitexplore.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import TextField from "@mui/material/TextField";

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

const H1Style = styled.img`
  flex-grow: 1;
  display: inline-block;
  font-size: 2em;
  z-index: 10000;
  max-width:20%;
  height: auto;
`;

const SearchBar = styled.div`
  display: flex;
  height: 55px;
  width: 100%;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  width: 50%;
  border-radius: 5px;
`

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

export const ToiletsList = styled.section`
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 23vh;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 2%;
  padding: 1vw;
`

export const ToiletCard = styled.div`
  padding: 2%;
  flex-grow: 1;
  flex-basis: 16%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
`;

export const ToiletCardImage = styled.img`
  object-position: center;
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 5%;
  z-index: -1;
  align-self: center;
`

export const ToiletCardNameRating = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ToiletCardInfo = styled.div`
  display: block;
  color: gray;
`;

export const ToiletCardName = styled.div`
  display: inline-block;
  margin-top: auto;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  font-size: 20px;
`

export const ToiletCardRating = styled.div`
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
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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

  & > div {
    padding: 12px 15px;
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
`

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
  const [favourite, setFavourite] = useState("");
  const [gender, setGender] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");

  const toiletCollection = [
    {
      "name": "Ainsworth", 
      "imageURL": 'clown.jpg', 
      "rating": "4.83", 
      "gender": "Male", 
      "floor": "Floor 2",
      "favourited": "false",
    },
    {
      "name": "Quadrangle", 
      "imageURL": 'clown.jpg', 
      "rating": "3.20", 
      "gender": "Female", 
      "floor": "Ground Floor",
      "favourited": "true",
    },
    {
      "name": "Main Library", 
      "imageURL": 'clown.jpg', 
      "rating": "1.34", 
      "gender": "female", 
      "floor": "Floor 4",
      "favourited": "false",
    },
    {
      "name": "Ainsworth", 
      "imageURL": 'clown.jpg', 
      "rating": "4.94", 
      "gender": "Male", 
      "floor": "Floor 3",
      "favourited": "false",
    },
    {
      "name": "Law Library", 
      "imageURL": 'clown.jpg', 
      "rating": "4.12", 
      "gender": "Female", 
      "floor": "Floor 1",
      "favourited": "true",
    },
  ];

  let toiletDisplay = [...toiletCollection];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = event.target.value.toLowerCase();
    setSearchInput(lowerCase);
  }

  const handleFavouriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFavourite(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const clearAllFilters = () => {
    setGender("");
    setFavourite('');
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
          <h3>Favourite</h3>
          {["Favourites"].map((favourite1) => (
            <label key={favourite1}>
              <input 
                type="checkbox" 
                name="favourited"
                value="Favourite"
                checked={favourite === 'Favourite'}
                onChange={handleFavouriteChange} 
              />
              {favourite1}
            </label>
          ))}
          <h3>Gender</h3>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={gender === "male"} 
              onChange={handleGenderChange} 
            />
            Male
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={gender === "female"} 
              onChange={handleGenderChange} 
            />
            Female
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="other" 
              checked={gender === "other"} 
              onChange={handleGenderChange} 
            />
            Other
          </label>
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
  }

  const [toilets, setToilets] = useState(toiletCollection);
  const remainder = 4 - (toilets.length % 4);

  const arr = []
  for (let i = 0; i < remainder; i++) {
    const emptyToilet = {"name": "", "imageURL": empty};
    arr.push(emptyToilet);
  }

  return (
    <>
      <BarContainer>
        <MenuBar>
          <H1Style src={goodshitimg}></H1Style>

          <SearchBar>
            <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
            label="Search"
            style={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </SearchBar>

          <div style={{ fontSize: '20px', fontWeight:200, paddingLeft: '50px' }}>Finding your Perfect Shit</div>

          <IconButton style={{ padding: 0 }} onClick={languageTrue}>
            <LanguageIcon fontSize="large" style={{ cursor: 'pointer' }} />
          </IconButton>

          <Dialog open={languageOpen} onClose={languageFalse}>
          <DialogTitle>Select a language</DialogTitle>
          <DialogContent>
            English (your only option lmao)
          </DialogContent>
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
                <div onClick={() => handleItemClick('Profile')}>Profile</div>
                <div onClick={() => handleItemClick('Settings')}>Settings</div>
                <div onClick={() => handleItemClick('Logout')}>Logout</div>
            </DropDownProfile>
            )}
          </ProfileBox>
        </MenuBar>

        <FilterBar>
          <div className="sort" style={{display: 'inline-block'}}>

          <SortIcon style={{ cursor: 'pointer' }} onClick={() => setIsFilterOpen(true)}>Open Filters</SortIcon>
            {isFilterOpen && <FilterPopup onClose={() => setIsFilterOpen(false)} />}
          </div>
        </FilterBar>
      </BarContainer>

      <ToiletsList>
      {
        toilets.filter(toilet => {
          if (searchInput === '') {
            return toilet;
          } else if (toilet.name.toLowerCase().startsWith(searchInput.toLowerCase())) {
            return toilet;
          }
        }).filter(toilet => {
          if (gender === '') {
            return toilet;
          } else if (toilet.gender.toLowerCase() === gender) {
            return toilet;
          }
        }).filter(toilet => {
          if (favourite === '') {
            return toilet;
          } else if (favourite === 'Favourite' && toilet.favourited === 'true') {
            return toilet;
          }
        }).map((toilet)=>( 
          <ToiletCard>
            <ToiletCardImage src={"/src/assets/" + toilet['imageURL']}></ToiletCardImage>
            <ToiletCardNameRating>
              <ToiletCardName>{toilet["name"]}</ToiletCardName>
              <ToiletCardRating>💩 {toilet["rating"]}</ToiletCardRating>
            </ToiletCardNameRating>
            <ToiletCardInfo>{toilet["gender"]}</ToiletCardInfo>
            <ToiletCardInfo>{toilet["floor"]}</ToiletCardInfo>
          </ToiletCard>
        ))
      }
      {
        arr.map((toilet)=>(
          <ToiletCard>
            <ToiletCardImage src={empty}></ToiletCardImage>
            {toilet["name"]}
          </ToiletCard>
        ))
      }
      </ToiletsList>
    </>
  );
}

export default ExplorePage;

