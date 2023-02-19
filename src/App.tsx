import styled from 'styled-components';
// TS가 Styled compo 모른다고 에러 띄우는데
// npm install @types/styled-components 으로 type definition을 설치
// 타입 데피니션은 라이브러리 등을 사용할 때 TS에게 해당 라이브러리를 정의해놓은 것.
const Title = styled.h1`
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
