import { DefaultTheme } from 'styled-components';

const palette = {
  background: '#fff',
  black: '#2c3342',
  gray200: '#eceef1',
  gray400: '#dddee1',
  gray600: '#7f8998',
  white: '#fff',
  blue: '#f2f4f6',
  red: '#ec5642',
};

const font = {
  xs: '0.625rem', // 10px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.25rem', // 20px
};

const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  xl2: '2.5rem', // 40px
};

const size = { sm: '640px', md: '768px', lg: '1024px' };

const breakpoint = {
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  la: `(min-width: ${size.lg})`,
};

const theme: DefaultTheme = { palette, font, spacing, breakpoint };

export type PaletteTypes = typeof palette;
export type FontTypes = typeof font;
export type SpacingTypes = typeof spacing;
export type BreakpointTypes = typeof breakpoint;

export default theme;
