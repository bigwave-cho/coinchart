import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme, lightTheme } from './theme';
// theme.ts에 선언된 theme 사용

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider
      // lightTheme에 따라 적용
      theme={darkTheme}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
