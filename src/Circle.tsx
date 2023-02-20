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
  text?: string;
}

const Circle = ({
  bgColor,
  borderColor,
  text = 'default text', // 이거는 ES6 문법. 더 좋아.
}: CircleProps) => {
  // Styled Compo의 props 타입은 borderColor가 required 이기 때문에
  // 에러가 발생하고 있고 그래서 borderColor를 보낼 때 기본값을 주면 해결됨.
  // a ?? b   : a가 undefined면 b , 있으면 a
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
};

export default Circle;
