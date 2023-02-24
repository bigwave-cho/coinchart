import { DefaultTheme } from 'styled-components';
// styled.d.ts 에서 선언된 타입을 사용 가능.
export const darkTheme: DefaultTheme = {
  bgColor: '#2f3640',
  textColor: 'white',
  accentColor: '#4cd137',
  cardBgColor: 'transparent',
};

export const lightTheme: DefaultTheme = {
  bgColor: 'whitesmoke',
  textColor: 'black',
  accentColor: '#4cd137',
  cardBgColor: 'white',
};
