import 'styled-components';
import {
  DeviceTypes,
  FontTypes,
  PaletteTypes,
  SpacingTypes,
} from './src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: PaletteTypes;
    font: FontTypes;
    spacing: SpacingTypes;
    device: DeviceTypes;
  }
}
