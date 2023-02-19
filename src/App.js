import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  /*
  이런식으로 하면 0& ~ 100%
  from {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  to{
    transform: rotate(360deg);
    border-radius: 50px;
  }
  */
  0%{
   transform: rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform: rotate(360deg);
    border-radius: 50px;
  }
  100%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  //component 내의 요소 선택도 가능 (Pseudo Selectors)
  span {
    font-size: 36px;
    &:hover {
      font-size: 50px;
    }
    &:active {
      opacity: 0;
    }
  }
  /*
  아래와 같음.
  span:hover {
  }
  */
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>😽</span>
      </Box>
    </Wrapper>
  );
}

export default App;
