import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

// AS and Attrs
// tag는 바꾸고 속성은 그대로 두기

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

// Attrs : 생성 시 속성 설정, 원래 였다면 각 요소에 required 넣어줬어야.
const Input = styled.input.attrs({ reqired: true, minLength: 10 })`
  background-color: tomato;
`;

// 또 하나의 button이 되는 것이므로 해결책 X
// const Link = styled(Btn)``

function App() {
  return (
    <Father>
      <Btn>Log in</Btn>
      <Btn
        //컴포넌트에 as 속성 주면 태그 변경됨.
        as="a"
        href="/"
      >
        Log in
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
