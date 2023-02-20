import { DefaultTheme } from 'styled-components';
// styled.d.ts 에서 선언된 타입을 사용 가능.
export const lightTheme: DefaultTheme = {
  bgColor: 'white',
  textColor: 'black',
  btnColor: 'tomato',
};
export const darkTheme: DefaultTheme = {
  bgColor: 'black',
  textColor: 'white',
  btnColor: 'teal',
};
