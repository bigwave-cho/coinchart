import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';

// 다크모드 설정을 위해 두 객체의 프로퍼티는 대칭적이여야 한다.
const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#111',
};

const lightTheme = {
  textColor: '#111',
  backgroundColor: 'whitesmoke',
};
// ThemeProvider의 theme에 객체를 넣어두면 전역적으로 접근 가능.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
