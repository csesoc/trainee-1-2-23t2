import styled from 'styled-components'
import { useState } from 'react';

const Main = styled.main`
  margin-bottom: 200%;
`;

const FloatingMenuContainer = styled.div`
  font-family: sans-serif;
  background: #9c8378;
  padding: 5px;
  width: 95vw;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Grid = styled.div`
  margin-top: 100px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
`;

const ToiletCard= styled('div')`
  width: 200px;
  background-color: red;
`

const ExplorePage = () => {
  const [toilets, setToilets] = useState([{"name": "Toilet 1"},{"name": "Toilet 1"},{"name": "Toilet 1"}]);
  const remainder = 4 - (toilets.length % 4)

  const arr = []
  for (let i = 0; i < remainder; i ++) {
    arr.push(1);
  }
return (
  <>
    <FloatingMenuContainer><button>Attributes</button></FloatingMenuContainer>
    <Grid>
    {
      toilets.map((toilet)=>(<ToiletCard>{toilet["name"]}</ToiletCard>))
    }
    {
      arr.map(()=>(<ToiletCard>blank</ToiletCard>))
    }
    </Grid>
  </>
)
}

export default ExplorePage;

