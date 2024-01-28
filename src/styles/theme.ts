import { DefaultTheme } from 'styled-components';

export const palette = {
  background: '#fff',
  black: '#2c3342',
  gray200: '#eceef1',
  gray400: '#dddee1',
  gray600: '#7f8998',
  white: '#fff',
  blue: '#f2f4f6',
  red: '#ec5642',
};

export const font = {
  xs: '0.625rem', // 10px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.25rem', // 20px
  lg2: '1.5rem', // 24px
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  xl2: '2.5rem', // 40px
  xl3: '6rem', //
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
};

const theme: DefaultTheme = { palette, font, spacing, device };

export type PaletteTypes = typeof palette;
export type FontTypes = typeof font;
export type SpacingTypes = typeof spacing;
export type DeviceTypes = typeof device;

export default theme;
