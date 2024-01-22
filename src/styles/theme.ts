import { DefaultTheme } from 'styled-components';

const palette = {
  background: '#fff',
  black: '#111',
  grey: '#767676',
  lightGrey: '#d1d1d1',
  white: '#fff',
  lignthBlue: '#f2f4f6',
  red: '#ec5642',
};

const font = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '40px',
};

const size = { sm: '640px', md: '768px', lg: '1024px' };

const breakpoint = {
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  la: `(min-width: ${size.lg})`,
};

const theme: DefaultTheme = { palette, font, breakpoint };

export default theme;
