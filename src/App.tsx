import styled from 'styled-components';
import Circle from './Circle';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Circle borderColor="yellow" bgColor="teal" />
      <Circle bgColor="tomato" />
    </Wrapper>
  );
}

export default App;
