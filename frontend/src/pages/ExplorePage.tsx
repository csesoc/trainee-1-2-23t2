import styled from 'styled-components'
import { useState } from 'react';
import empty from '/src/assets/empty.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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

const H1Style = styled.div`
  flex-grow: 1;
  display: inline-block;
  font-size: 2em;
  font-weight: 500;
`;

const CollectionSort = styled.div`
  display: inline-block;
  flex-grow: 1;
  flex-direction: column;
  padding-left:1vw;
  padding-right: 2vw;
  font-size: 0.8;
  font-weight: 400;
`;

const StyledLabel = styled.label`
  font-size: 1.4em;
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
  background-color: white;
`;

const ToiletsList = styled.section`
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 150px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 2%;
  padding: 1vw;
`

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
`

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
`

const ToiletCardRating = styled.div`
  display: inline-block;
  margin-top: auto;
  font-size: 18px;
`;

const ExplorePage = () => {
  const [languageOpen, setLanguageOpen] = useState(false);

  const languageTrue = () => {
    setLanguageOpen(true);
  };

  const languageFalse = () => {
    setLanguageOpen(false);
  }

  const [filter, setFilter] = useState("/");
  const [sort, setSort] = useState("/");

  const [toilets, setToilets] = useState(
    [
      {
        "name": "Toilet 1", 
        "imageURL": 'clown.jpg', 
        "rating": "4.83", 
        "building": "Ainsworth", 
        "floor": "Floor 2"
      },
      {
        "name": "Toilet 1", 
        "imageURL": 'clown.jpg', 
        "rating": "3.20", 
        "building": "Quadrangle", 
        "floor": "Ground Floor"
      },
      {
        "name": "Toilet 1", 
        "imageURL": 'clown.jpg', 
        "rating": "1.34", 
        "building": "Main Library", 
        "floor": "Floor 4"
      },
      {
        "name": "Toilet 1", 
        "imageURL": 'clown.jpg', 
        "rating": "4.94", 
        "building": "Ainsworth", 
        "floor": "Floor 3"
      },
      {
        "name": "Toilet 1", 
        "imageURL": 'clown.jpg', 
        "rating": "4.12", 
        "building": "Law Library", 
        "floor": "Floor 1"
      },
    ]);
  const remainder = 4 - (toilets.length % 4);

  console.log(remainder);
  console.log(toilets.length);

  const arr = []
  for (let i = 0; i < remainder; i++) {
    const emptyToilet = {"name": "", "imageURL": empty};
    arr.push(emptyToilet);
  }

  return (
    <>
      <BarContainer>
        <MenuBar>
          <H1Style>Good Shit</H1Style>

          <div style={{ fontSize: '18px', fontWeight:200 }}>Finding your Perfect Shit</div>

          <IconButton style={{ padding: '20px' }} onClick={languageTrue}>
            <LanguageIcon fontSize="large" style={{ cursor: 'pointer' }} />
          </IconButton>

          <Dialog open={languageOpen} onClose={languageFalse}>
          <DialogTitle>language</DialogTitle>
          <DialogContent>
            This is the content of the popup.
          </DialogContent>
          <DialogActions>
            <Button onClick={languageFalse} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

          <ProfileBox>
            <AccountCircleIcon fontSize="large" style={{ color: 'white' }} />
          </ProfileBox>
        </MenuBar>

        <FilterBar>
          <div className="sort" style={{display: 'inline-block'}}>

          <CollectionSort>
            <StyledLabel>Filter by: </StyledLabel>
            <select style={{ backgroundColor: '#f9f9f9', color: '#333', fontSize: '20px' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="/">Ratings</option>
              <option value="/">Location</option>
            </select>
          </CollectionSort>

          <CollectionSort>
            <StyledLabel>Sort by: </StyledLabel>
            <select style={{ backgroundColor: '#f9f9f9', color: '#333', fontSize: '20px' }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="/">Best Overall Rating</option>
              <option value="/">Worst Overall Rating</option>
            </select>
          </CollectionSort>

          </div>
        </FilterBar>
      </BarContainer>

      <ToiletsList>
      {
        toilets.map((toilet)=>(
          <ToiletCard>
            <ToiletCardImage src={"/src/assets/" + toilet['imageURL']}></ToiletCardImage>
            <ToiletCardNameRating>
              <ToiletCardName>{toilet["name"]}</ToiletCardName>
              <ToiletCardRating>💩 {toilet["rating"]}</ToiletCardRating>
            </ToiletCardNameRating>
            <ToiletCardInfo>{toilet["building"]}</ToiletCardInfo>
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

