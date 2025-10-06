import { createTheme } from '@mui/material/styles';
export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#55CBDA',
      light: '#8be9f5ff',
      dark: '#34a2b1ff',
    },
    secondary: {
      main: '#17bfa9',
      light: '#64ffda',
      dark: '#0d7769',
    },
  },
};
const theme = createTheme(themeOptions);
export default theme;