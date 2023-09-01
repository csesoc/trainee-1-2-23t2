import styled from 'styled-components'

const ProfilePicture = styled('img')`
background-color: black;
border-radius: 50%;
width: 100px;
height: 100px;
`

const StyledButton = styled('button')`
background-color: #fff;
`

const ProfileBackground = styled('div')`
height: 100vh;
`

const Banner = styled('div')`
background-color: red;
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