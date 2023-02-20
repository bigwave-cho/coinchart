import { useState } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

const Circle = ({ bgColor, borderColor }: CircleProps) => {
  const [counter, setCounter] = useState<number | string>(1);
  setCounter(2);
  setCounter('2');
  setCounter(true); //error
  // useState 기본값을 넣어두면 TS가 알아서 타입지정해주니
  // 위와 같은 간단한 타입은 추론하게 냅둬도 ㄱㅊ
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor ?? bgColor}
    ></Container>
  );
};

export default Circle;
