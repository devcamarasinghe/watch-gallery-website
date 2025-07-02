// src/theme/ThemeProvider.js
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './colors';

const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
