import { SVGProps } from 'react';
import { DefaultTheme } from 'styled-components';

export interface IconProps extends SVGProps<SVGSVGElement> {
  color?: keyof DefaultTheme['palette'];
}
