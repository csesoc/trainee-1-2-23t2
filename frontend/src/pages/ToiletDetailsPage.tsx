import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import goodshit from '/src/assets/good_shit.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CreateIcon from '@mui/icons-material/Create';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import StarIcon from '@mui/icons-material/Star';
import { Box, TableBody } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

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

type Review = {
    reviewName: string;
    user: string;
    TermTaken: string;
    Date: string;
    reviewWords: string;
    Enjoyment: string;
    Usefulness: string;
    Manageability: string;
}

type MenuContainerProps = {
    isAtTop: boolean;
};
  
const enjoymentLabels: { [index: string]: string } = {
    1: 'Bruh',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getEnjoymentLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${enjoymentLabels[value]}`;
}

const usefulnessLabels: { [index: string]: string } = {
    1: 'Bruh',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getUsefulnessLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${usefulnessLabels[value]}`;
}

const manageabilityLabels: { [index: string]: string } = {
    1: 'Bruh',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getManageabilityLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${manageabilityLabels[value]}`;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MenuContainer = styled.div<MenuContainerProps>`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    z-index: 1000;
    background-color: white;
    box-shadow: ${(props) => (props.isAtTop ? 'none' : '0px 8px 16px 0px rgba(0, 0, 0, 0.2)')};
    transition: box-shadow 0.3s;
`

const Logo = styled.img`
    display: inline-block;
    flex-grow: 1;
    max-width: 20%;
    height: auto;
    padding-left: 4vw;
    cursor: pointer;
`

const FillerBox = styled.div`
    min-width: 67vw;
    max-width: 67vw;
`

const ProfileBox = styled.button`
  display: flex;
  border-radius: 10px;
  background-color: #9c8379;
  padding: 1vw;
  cursor: pointer;
`;

const DropDownProfile = styled.div`
  position: absolute;
  top: 4.4rem;
  right: 4.4rem;
  width: 120px;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
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

const MarginBox = styled.div`
    margin-top: 14vh;
`

const ToiletContainer = styled.div`
    display: flex;
    margin-top: 2vh;
    padding: 1vw;
    max-width: 40%;
    min-width: 40%;
`

const ToiletDetail = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vw;
    padding-left: 3vw;
    min-width: 95%;
    max-width: 95%;
`

const ToiletTitle = styled.div`
    font-size: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 750;
`

const StallNumber = styled.div`
    font-size: 38px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 720;
`

const Availability = styled.div`
    font-size: 24px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 720;
    padding-top: 2vh;
`

const AvailabilityContainer = styled.div`
    display: flex;
    gap: 1vw;
    padding: 5px;
    padding-left: 0px;
`

const AvailabilityTime = styled.div`
    background-color: #efdbe1;
    border-radius: 100px;
    padding: 1vw;
    padding: 1vh;
    font-weight: 700;
    color: gray;
`

const RatingContainer = styled.div`
    display: flex;
    padding-top: 4vh;
    gap: 15px;
`

const ReviewNumber = styled.div`
    font-size: 20px;
`
const ToiletImage = styled.img`
    padding-top: 40px;
`

const ReviewContainer = styled.div`
    display: flex;
    max-width: 50%;
    padding-left: 8vw;
    flex-direction: column;
`
const ReviewMenuBar = styled.div`
    display: inline-flex;
    max-height: 4vh;
    align-items: center;
`

const ReviewTitle = styled.div`
    font-size: 30px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 720;
`

const ReviewFilterBar = styled.div`
    padding-left: 2vw;
    padding-right: 2vw;
    padding-top: 0.3vh;
`

const ReviewFilterButton = styled.div`
    color: white;
    background-color: #40404a;
    width: 10vw;
    height: 3.8vh;
    gap: 20px;
    cursor: pointer;
    padding-top: 0.8vh;
    padding-left: 0.5vw;
    border-radius: 4px;

    &:hover {
      background-color: #6B6B7B;
      transition: background-color 0.3s
    }
`

const ReviewFilterButtonWord = styled.div`
    font-weight: 700;
    font-size: 15px;
    padding-left: 0.7vw;
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
  width: 60vw;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
`;

const MakeAReviewTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
`

const UnderTitle = styled.div`
    color: gray;
`

const WriteTitle = styled.div`
    padding-top: 3vh;
    padding-bottom: 1vh;
    font-weight: 600;
`

const WriteReview = styled.div`
    padding-top: 1vh;
    padding-bottom: 1vh;
    font-weight: 600;
`

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

const TextOnlyReviews = styled.div`
    padding-top: 3vh;
`

const ReviewCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    padding-top: 2vh;
`

const ReviewCard = styled.div`
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 15px;
    min-width: 37.5vw;
    border-radius: 5px;
`

const ReviewCardDetails = styled.div`
    display: flex;
    justify-content: space-between;
`

const ReviewCardDetailsFirstHalf = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const ReviewCardDetailsSecondHalf = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const ReviewCardTitle = styled.div`
    font-weight: 650;
    font-size: 20px;
`

const ReviewCardDate = styled.div`
    font-size: 18px;
    font-weight: 550;
`

const ReviewCardUser = styled.div`
    color: gray;
`

const ReviewCardRating = styled.div`
    display: flex;
    color: gray;
    padding-top: 1vh;
    padding-left: 1vw;
    align-items: center;
`

const ReviewTermTaken = styled.div`
    color: gray;
    padding-left: 1vw;
`

const IndividualRatingContainer = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-evenly;
`

const IndividualRatingCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RatingMessage = styled.div`
    padding-top: 1.5vh;
    min-height: 3vh;
    max-height: 3vh;
`

const FillerBox2 = styled.div`
    color: white;
    padding-top: 1vh;
`

const LoadingImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ToiletDetails = () => {
    type Arrangement = 'Most Liked' | 'Most Recent'

    const [tabValue, setTabValue] = React.useState(0);
    const [EnjoymentValue, setEnjoymentValue] = React.useState<number | null>(1);
    const [UsefulnessValue, setUsefulnessValue] = React.useState<number | null>(1);
    const [ManageabilityValue, setManageabilityValue] = React.useState<number | null>(1);
    const [reviewText, setReviewText] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [enjoymentHover, setEnjoymentHover] = React.useState(-1);
    const [usefulnessHover, setUsefulnessHover] = React.useState(-1);
    const [manageabilityHover, setManageabilityHover] = React.useState(-1);
    const [reloadCount, setReloadCount] = useState(0);
    const [openProfile, setOpenProfile] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [reviewFilter, setReviewFilter] = React.useState<Arrangement>('Most Recent');
    const [textOnly, setTextOnly] = React.useState(false);
    const [addReviewOpen, setAddReviewOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpenProfile(false);
        }
    };

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
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            if (position <= 0) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
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

    const AddReviewPopUp = () => {
        return (
            <OverlayFilter>
                <PopupFilter onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={() => setAddReviewOpen(false)}>×</CloseButton>
                    <MakeAReviewTitle>Make a Review</MakeAReviewTitle>
                    <UnderTitle>We want to hear your opinions!</UnderTitle>
                    <WriteTitle>Write your Review Title</WriteTitle>
                        <TextField
                            label="Title"
                            id="review-title"
                            value = {reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                        />

                    <Box sx={{ width: '100%', paddingTop: '2vh' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="Enjoyment" {...a11yProps(0)} />
                            <Tab label="Usefulness" {...a11yProps(1)} />
                            <Tab label="Manageability" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={tabValue} index={0}>
                            Rate your Enjoyment
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: '2vh',
                                }}
                            >
                                <Rating
                                    name="Enjoyment"
                                    value={EnjoymentValue}
                                    precision={1}
                                    getLabelText={getEnjoymentLabelText}
                                    onChange={(event, newValue) => {
                                        setEnjoymentValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setEnjoymentHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {EnjoymentValue !== null && (
                                    <Box sx={{ ml: 2 }}>{enjoymentLabels[enjoymentHover !== -1 ? enjoymentHover : EnjoymentValue]}</Box>
                                )}
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={1}>
                            Rate the Usefulness
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: '2vh',
                                }}
                            >
                                <Rating
                                    name="Usefulness"
                                    value={UsefulnessValue}
                                    precision={1}
                                    getLabelText={getUsefulnessLabelText}
                                    onChange={(event, newValue) => {
                                        setUsefulnessValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setUsefulnessHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {UsefulnessValue !== null && (
                                    <Box sx={{ ml: 2 }}>{usefulnessLabels[usefulnessHover !== -1 ? usefulnessHover : UsefulnessValue]}</Box>
                                )}
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={2}>
                            Rate the Manageability
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: '2vh',
                                }}
                            >
                                <Rating
                                    name="Manageabilitty"
                                    value={ManageabilityValue}
                                    precision={1}
                                    getLabelText={getManageabilityLabelText}
                                    onChange={(event, newValue) => {
                                        setManageabilityValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setManageabilityHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {ManageabilityValue !== null && (
                                    <Box sx={{ ml: 2 }}>{manageabilityLabels[manageabilityHover !== -1 ? manageabilityHover : ManageabilityValue]}</Box>
                                )}
                            </Box>
                        </CustomTabPanel>
                    </Box>
                    
                    <WriteReview>Write your Review</WriteReview>
                    
                    <TextField
                        label="Review"
                        id="review-bodys"
                        multiline
                        rows={10}
                        value = {reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />

                    <FillerBox2>hi</FillerBox2>
                    
                    <Button variant="contained" onClick={() => {
                        submitReview();
                        setAddReviewOpen(false)
                        setReviewText('');
                        setReviewTitle('');
                        setEnjoymentValue(1);
                        setUsefulnessValue(1);
                        setManageabilityValue(1);
                        setReloadCount(prev => prev + 1)
                    }}>Submit Review</Button>
                    
                </PopupFilter>
            </OverlayFilter>
        );
    };
    
    const submitReview = async() => {
        const stringEnjoyment = JSON.stringify(EnjoymentValue);
        const stringUsefulness = JSON.stringify(UsefulnessValue);
        const stringManageability = JSON.stringify(ManageabilityValue);

        console.log(stringEnjoyment + stringUsefulness + stringManageability);
        try {
            const response = await axios.post(`http://localhost:6969/auth/toilets/review/${id}`, {
                reviewTitle,
                stringEnjoyment,
                stringUsefulness,
                stringManageability,
                reviewText
            });
            return (
                <div>successfully submitted</div>
            );
        } catch (error) {
            <div>error submitting</div>
        }
    }

    const reviewFilterChange = (event: SelectChangeEvent) => {
        setReviewFilter(event.target.value as Arrangement);
    }

    const { id } = useParams<{ id: string }>();

    const [toilets, setToilets] = useState<ToiletType[]>([]);
    const fetchToilets = async () => {
        try {
            const response = await axios.get('http://localhost:6969/auth/toilets/list', {withCredentials: true});
            setToilets(response.data);
        } catch (error) {
            console.log('Error fetching data', error);
        }
    };
    
    useEffect(() => {
        fetchToilets();
    }, [reloadCount]);

    const toiletDetail = toilets.find(toilet => toilet.toiletId === id);

    if (!toiletDetail) {
        return <LoadingImage src={'/src/assets/loading.gif'}/>;
    }

    const reviews: Review[] = toiletDetail.reviews;

    let totalRating = 0;

    for (let review of reviews) {
    totalRating += parseFloat(review.Enjoyment);
    totalRating += parseFloat(review.Usefulness);
    totalRating += parseFloat(review.Manageability);
    }

    const overallAverageRating = totalRating / (reviews.length * 3);

    const getDateFromString = (dateString: string): Date => {
        const [day, month, year] = dateString.split("/").map(str => parseInt(str, 10));
        return new Date(year, month - 1, day);
    }

    const RearrangedReviews = (arrange: Arrangement) => {
        switch(arrange) {
            case 'Most Recent':
                return [...reviews].sort((a, b) => getDateFromString(b.Date).getTime() - getDateFromString(a.Date).getTime());
            case 'Most Liked':
                return [...reviews].sort((a, b) => (parseFloat(b.Enjoyment) + parseFloat(b.Usefulness) + parseFloat(b.Manageability)) - (parseFloat(a.Enjoyment) + parseFloat(a.Usefulness) + parseFloat(a.Manageability))); 
            default:
                return reviews;
        }
    }

    const sortedReviews = RearrangedReviews(reviewFilter);

    const handleTextOnly = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextOnly(event.target.checked);
    };

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
    
    const userLoggedIn = getCookie('token');

    const filteredReviews = sortedReviews.filter((review) => {
        if (!textOnly) {
            return review;
        } else {
            if (review.reviewWords.trim().length !== 0) {
                return review;
            }
        }
    });

    return (
    <>
        <MenuContainer isAtTop={isAtTop}>
            <Logo src = {goodshit} onClick={() => navigate("/explore")}></Logo>
            <FillerBox></FillerBox>
            <ProfileBox onClick={() => setOpenProfile(!openProfile)}>
                <AccountCircleIcon fontSize="large" style={{ color: 'white' }} />
                {openProfile && (
                <DropDownProfile ref={dropdownRef}>
                    {!userLoggedIn ? (
                        <Link to="/login" state={{ from: location }}>Login</Link>
                    ) : (
                    <>
                        <div onClick={() => navigate("/profile")}>Profile</div>
                        <div onClick={() => handleItemClick('Settings')}>Settings</div>
                        <div onClick={handleLogout}>
                            Logout
                        </div>
                    </>
                    )}
                </DropDownProfile>
                )}
          </ProfileBox>
        </MenuContainer>
        <MarginBox>
            <ToiletContainer>
                <ToiletDetail>
                    <ToiletTitle>
                        {toiletDetail['floor']} {toiletDetail['name']}
                    </ToiletTitle>

                    <StallNumber>
                        {toiletDetail['toiletNumber']} toilet stalls
                    </StallNumber>

                    <Availability>
                        Availability
                    </Availability>

                    <AvailabilityContainer>
                        {toiletDetail.availability.map(time => (
                            <AvailabilityTime>{time}</AvailabilityTime>
                        ))}
                    </AvailabilityContainer>
                        
                    <RatingContainer>
                        <Rating name="Toilet Rating" defaultValue={overallAverageRating} size="large" precision={0.1} readOnly />
                        <ReviewNumber>{toiletDetail.reviews.length} reviews</ReviewNumber>
                    </RatingContainer>

                    <ToiletImage src={'/src/assets/' + toiletDetail['imageURL']}></ToiletImage>

                </ToiletDetail>

                <ReviewContainer>
                    <ReviewMenuBar>
                        <ReviewTitle>Reviews</ReviewTitle>

                        <ReviewFilterBar>
                            <FormControl sx={{ minWidth: 400 }} size="small">
                            <InputLabel id="demo-select-small-label">Sort by</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={reviewFilter}
                                label="Sort by"
                                onChange={reviewFilterChange}
                            >
                                <MenuItem value={"Most Recent"}>Most Recent</MenuItem>
                                <MenuItem value={"Most Liked"}>Most Liked</MenuItem>
                            </Select>
                            </FormControl>
                        </ReviewFilterBar>

                        <ReviewFilterButton onClick={() => setAddReviewOpen(true)}>
                            <CreateIcon/>
                            <ReviewFilterButtonWord>Add a Review</ReviewFilterButtonWord>
                        </ReviewFilterButton>
                        {addReviewOpen ? AddReviewPopUp() : <></>}
                    </ReviewMenuBar>

                    <TextOnlyReviews>
                        <FormControlLabel control={<Switch checked={textOnly} onChange={handleTextOnly} inputProps={{ 'aria-label': 'controlled' }}/>} label="Text only reviews"/>
                    </TextOnlyReviews>

                    <ReviewCardContainer>
                        {filteredReviews.map(review => (
                            <ReviewCard>
                                <ReviewCardDetails>
                                    <ReviewCardDetailsFirstHalf>
                                        <ReviewCardTitle>
                                            {review.reviewName}
                                        </ReviewCardTitle>
                                        <ReviewCardRating>
                                            Overall: <Rating name="Review Rating" defaultValue={(parseFloat(review.Enjoyment) + parseFloat(review.Manageability) + parseFloat(review.Usefulness))/3} precision={0.1} readOnly />
                                        </ReviewCardRating>
                                        <ReviewTermTaken>
                                            Term Taken: {review.TermTaken}
                                        </ReviewTermTaken>
                                    </ReviewCardDetailsFirstHalf>
                                    <ReviewCardDetailsSecondHalf>
                                        <ReviewCardDate>
                                            {review.Date}
                                        </ReviewCardDate>
                                        <ReviewCardUser>
                                            {review.user}
                                        </ReviewCardUser>
                                    </ReviewCardDetailsSecondHalf>
                                </ReviewCardDetails> 

                                <IndividualRatingContainer>
                                    <IndividualRatingCard>
                                        Enjoyment
                                        <Rating name="Enjoyment Rating" defaultValue={parseFloat(review.Enjoyment)} precision={0.1} readOnly />
                                    </IndividualRatingCard>
                                    <IndividualRatingCard>
                                        Usefulness
                                        <Rating name="Usefulness Rating" defaultValue={parseFloat(review.Usefulness)} precision={0.1} readOnly />
                                    </IndividualRatingCard>
                                    <IndividualRatingCard>
                                        Manageability
                                        <Rating name="Manageability Rating" defaultValue={parseFloat(review.Manageability)} precision={0.1} readOnly />
                                    </IndividualRatingCard>
                                </IndividualRatingContainer>   

                                <RatingMessage>
                                    {review.reviewWords}
                                </RatingMessage>                    
                            </ReviewCard>
                        )
                        )}
                    </ReviewCardContainer>
                </ReviewContainer>
            </ToiletContainer>
        </MarginBox>
    </>
    )
}

export default ToiletDetails;