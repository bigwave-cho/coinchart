import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const rotationAnimation = keyframes`
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

// Puseudo part 2.

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  //tag가 아닌 컴포넌트를 넣어주면 컴포넌트 태그가 무엇으로 바뀌어도 적용됨.
  ${Emoji} {
    &:hover {
      font-size: 98px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji
        //얘는 hover 적용되고
        >
          😽
        </Emoji>
      </Box>
      <Emoji
      // 얘는 적용안됨
      >
        🤥
      </Emoji>
    </Wrapper>
  );
}

export default App;
