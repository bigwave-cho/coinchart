import styled, { keyframes } from 'styled-components';

//Theme
const Title = styled.h1`
  //styledcomponent의 prop은 컴포넌트에서 직접 전달뿐 아니라
  // ThemeProvider을 최상위에 설정해뒀기 때문에
  // theme 객체에 접근해서 textColor를 가져올 수 있음.
  color: ${(props) => props.theme.textColor};
`;

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
      <Title>132132</Title>
    </Wrapper>
  );
}

export default App;
