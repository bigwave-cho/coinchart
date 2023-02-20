import styled from 'styled-components';

interface CircleProps {
  bgColor: string;
}

// StyledComponents에 프롭 타입 지정하는 방법 <type>
const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

const Circle = ({ bgColor }: CircleProps) => {
  return <Container bgColor={bgColor} />;
  //const Container: StyledComponent<"div", any, {}, never>
};

export default Circle;

// 예시 TS가 런타임 전에 에러 띄우는 것
interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name}`;
sayHello({ name: 'wf', age: 12 });
sayHello({ name: 'wf', age: 12, hello: 1 }); //error
