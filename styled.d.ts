import 'styled-components';
import {
  BreakpointTypes,
  FontTypes,
  PaletteTypes,
  SpacingTypes,
} from './src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: PaletteTypes;
    font: FontTypes;
    spacing: SpacingTypes;
    breakpoint: BreakpointTypes;
  }
}
