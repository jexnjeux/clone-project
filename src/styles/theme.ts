import { DefaultTheme } from 'styled-components';

const palette = {
  background: '#fff',
  black: '#111',
  gray200: '#eceef1',
  gray400: '#dddee1',
  gray600: '#7f8998',
  white: '#fff',
  blue: '#f2f4f6',
  red: '#ec5642',
};

const font = {
  xs: '10px',
  sm: '12px',
  md: '16px',
  lg: '20px',
};

const size = { sm: '640px', md: '768px', lg: '1024px' };

const breakpoint = {
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  la: `(min-width: ${size.lg})`,
};

const theme: DefaultTheme = { palette, font, breakpoint };

export default theme;
