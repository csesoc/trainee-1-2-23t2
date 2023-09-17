import styled from 'styled-components';
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
import { Link, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Happy from '/src/assets/happy.png';
import axios from 'axios';

interface Review {
  reviewName: string;
  user: string;
  TermTaken: string;
  Date: string;
  reviewWords: string;
  Enjoyment: string;
  Usefulness: string;
  Manageability: string;
}

interface ToiletType {
  toiletId: string;
  name: string;
  imageURL: string;
  gender: string;
  floor: string;
  favourited: string;
  toiletNumber: string;
  availability: string[];
  reviews: Review[];
}

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

const H1Container = styled(Link)`
  flex-grow: 1;
  text-decoration: none;
  max-width: 20%;
`;

const H1Style = styled.img`
  display: block;
  z-index: 10000;
  max-width: 100%;
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
`;

const Saying = styled.div`
  font-size: 20px;
  font-weight: 200;
  padding-left: 50 px;
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

export const ToiletsList = styled.section`
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 23vh;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 2%;
  padding: 1vw;
`;

export const ToiletCard = styled.div`
  padding: 2%;
  flex-grow: 1;
  flex-basis: 16%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  cursor: pointer;
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
`;

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
`;

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

const ToiletExist = styled.div`
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const HappyImage = styled.img`
  max-width: 30%;
  height: auto;
`;

const ExplorePage = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favourite, setFavourite] = useState('');
  const [gender, setGender] = useState<string>('');
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = event.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const handleFavouriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFavourite(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const clearAllFilters = () => {
    setGender('');
    setFavourite('');
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  interface Props {
    onClose: () => void;
  }

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const userLoggedIn = getCookie('token');
  console.log(userLoggedIn);

  const FilterPopup: React.FC<Props> = ({ onClose }) => {
    return (
      <OverlayFilter onClick={onClose}>
        <PopupFilter onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <h3>Favourite</h3>
          {['Favourites'].map((favourite1) => (
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

  type Action = 'Login' | 'Profile' | 'Settings' | 'Logout';

  const handleItemClick = (action: Action) => {
    switch (action) {
      case 'Login':
        console.log('Navigating to login....');
        break;
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

  const [toilets, setToilets] = useState<ToiletType[]>([]);
  useEffect(() => {
    axios.get('http://localhost:6969/auth/toilets/list')
      .then(response => {
        setToilets(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const newFilteredToilets = toilets
    .filter((toilet) => {
      if (searchInput === '') {
        return toilet;
      } else if (toilet.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return toilet;
      }
    })
    .filter((toilet) => {
      if (gender === '') {
        return toilet;
      } else if (toilet.gender.toLowerCase() === gender) {
        return toilet;
      }
    })
    .filter((toilet) => {
      if (favourite === '') {
        return toilet;
      } else if (favourite === 'Favourite' && toilet.favourited === 'true') {
        return toilet;
      }
    });

  let remainder = 0;
  if (newFilteredToilets.length > 0) {
    remainder = 4 - (newFilteredToilets.length % 4);
  }

  if (remainder === 4) {
    remainder = 0;
  }

  const arr = [];
  for (let i = 0; i < remainder; i++) {
    const emptyToilet = { name: '', imageURL: empty };
    arr.push(emptyToilet);
  }

  function calculateAverageToiletRating(id: number) {
    const toiletToAverage = toilets.find((toilet) => parseInt(toilet.toiletId) === id);
    let totalRating = 0;
    let numOfRatings = 0;

    if (!toiletToAverage) {
      return 0;
    }

    toiletToAverage.reviews.forEach((review) => {
      totalRating += parseFloat(review.Enjoyment);
      totalRating += parseFloat(review.Usefulness);
      totalRating += parseFloat(review.Manageability);
      numOfRatings += 3;
    });

    const averageRating = totalRating / numOfRatings;
    return averageRating.toFixed(2);
  }

  interface LogoutResponse {
    message: string;
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post<LogoutResponse>('http://localhost:6969/auth/logout');
      if (response.data.message === 'Logged out') {
        console.log(response.data.message);
        navigate('/login');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <>
      <StyledBackground/>
      <BarContainer>
        <MenuBar>
          <H1Container to="/explore">
            <Link to="/">
              <H1Style src={goodshitimg}></H1Style>
            </Link>
          </H1Container>

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

          <Saying>Finding your Perfect Shit</Saying>

          <IconButton onClick={languageTrue}>
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
                {!userLoggedIn ? (
                  <Link to="/login" state={{ from: location }}>
                    Login
                  </Link>
                ) : (
                  <>
                    <Link to="/profile">Profile</Link>
                    <div onClick={() => handleItemClick('Settings')}>Settings</div>
                    <div onClick={handleLogout}>
                      Logout
                    </div>
                  </>
                )}
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
        {newFilteredToilets.length === 0 ? (
          <>
            <ToiletExist>
              Not gonna be active on Discord tonight. I'm meeting a girl (a real one) in half an hour (wouldn't expect a lot of
              you to understand anyway) so please don't DM me asking me where I am (im with the girl, ok) you'll most likely get
              aired because ill be with the girl (again I don't expect you to understand) shes actually really interested in me
              and its not a situation i can pass up for some meaningless Discord degenerates (because ill be meeting a girl, not
              that you really are going to understand) this is my life now. Meeting women and not wasting my precious time online,
              I have to move on from such simp things and branch out (you wouldnt understand)
            </ToiletExist>
            <HappyImage src={Happy}></HappyImage>
          </>
        ) : (
          newFilteredToilets.map((toilet) => (
            <ToiletCard onClick={() => navigate(`/toiletdeets/${toilet.toiletId}`)}>
              <ToiletCardImage src={'/src/assets/' + toilet['imageURL']}></ToiletCardImage>
              <ToiletCardNameRating>
                <ToiletCardName>{toilet['name']}</ToiletCardName>
                <ToiletCardRating>💩 {calculateAverageToiletRating(parseInt(toilet['toiletId']))}</ToiletCardRating>
              </ToiletCardNameRating>
              <ToiletCardInfo>{toilet['gender']}</ToiletCardInfo>
              <ToiletCardInfo>{toilet['floor']}</ToiletCardInfo>
            </ToiletCard>
          ))
        )}
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
