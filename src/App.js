import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

//styled components에 prop 적용하기.
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

//Extending 속성을 그대로 가져와서 다른 속성을 추가하고 싶을 때!
/*
const Circle = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
*/
// 요롷게 extend!!
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal">
        <Text>Hello</Text>
      </Box>
      <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;
