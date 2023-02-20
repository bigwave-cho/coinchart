import { useState } from 'react';
import styled from 'styled-components';

//SC에서도 theme 접근 가능.
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
/*
styled Component에 TS를 적용하기
1. @types...  타입 데피니션을 설치해서 TS에게 SC 소개
2. d.ts파일로  declaration 덮어쓰기!'

// 또는 definitly Types에서 확인해도 되지만
// 숨겨져있는 것도 많으니 ex) npm i @types/필요라이브러리 해서 설치되면 있는거 안되면 없는거.
*/

function App() {
  return (
    <Container>
      <H1>protected</H1>
    </Container>
  );
}

export default App;
