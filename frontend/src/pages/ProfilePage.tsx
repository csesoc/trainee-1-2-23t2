import styled from 'styled-components'

const ProfilePicture = styled('img')`
background-color: black;
border-radius: 50%;
width: 200px;
height: 200px;
margin-top: -60px;
`

const StyledButton = styled('button')`
background-color: #fff;
`

const ProfileBackground = styled('div')`
height: 100vh;
`

const Banner = styled('div')`
background-color: gray;
height: 20vh;
`

const ProfilePage = () => {
return (
  <ProfileBackground>
    <Banner></Banner>
    <ProfilePicture></ProfilePicture>
  </ProfileBackground>
)
}

export default ProfilePage;