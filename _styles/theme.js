import { DefaultTheme } from 'react-native-paper';
export const MainTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9b4be5',
    accent: '#ff3347',
    light: {
      icongray: '#757575',
    },
    dark: {
      icongray: '#6f6f70',
    },
  },
};
