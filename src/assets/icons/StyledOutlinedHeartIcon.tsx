import { SVGProps } from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface IconProps extends SVGProps<SVGSVGElement> {
  colorName?: keyof DefaultTheme['palette'];
}

function OutlinedHeartIcon({ ...props }: IconProps) {
  return (
    <svg
      {...props}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" />
    </svg>
  );
}

const StyledOutlinedHeartIcon = styled(OutlinedHeartIcon)`
  width: ${({ width }) => width ?? '20px'};
  fill: ${({ theme, colorName }) =>
    colorName ? theme.palette[colorName] : theme.palette.gray600};
`;

export default StyledOutlinedHeartIcon;