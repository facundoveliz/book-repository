import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  // background: '#ccbfaf',
  background: '#FFEDDB',
  foreground: '#373027',
  foregroundSoft: '#6b7280',

  // primary: '#5b9a71',
  // secondary: '#886fa2',
  primary: '#BF9270',
  secondary: '#E3B7A0',

  border: '#b3a292',
  divider: '#fff',
};

export const darkTheme = {
  background: '#16181c',
  foreground: '#ecf9fb',
  foregroundSoft: '#ecf9fb',
  primary: '#1bd96a',
  secondary: '#74b6f3',
  border: '#404040',
  divider: '#fff',
};

export type ThemeType = {
  theme: typeof lightTheme;
};

export const GlobalStyle = createGlobalStyle<ThemeType>`
  html, body {
    transition: background 0.2s ease-in, color 0.2s ease-in;
    margin: 0;
    padding: 0;
    p {
      margin: 0;
      padding: 0;
    }
    h1 {
      letter-spacing: 1px;
    }
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.foreground};
  }
}`;
