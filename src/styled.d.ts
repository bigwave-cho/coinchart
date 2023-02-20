// import original module declarations
// https://joshua1988.github.io/ts/usage/declaration.html
// https://styled-components.com/docs/api#typescript
// 전역 변수나 전역 함수에 대한 타입을 선언해서
// @types...의 index.d.ts 파일을 오버라이드
import 'styled-components';

// and extend them!
// 전역 theme으로 사용할 theme의 타입을 설정(theme.ts에서 확인)
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
