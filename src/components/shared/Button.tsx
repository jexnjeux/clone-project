import React from 'react';
import styled from 'styled-components';
import { buttonColorMap, buttonSizeMap } from '../../styles/button';

interface ButtonProps {
  children: React.ReactNode;
  $solid?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button = styled.button<ButtonProps>`
  ${({ $solid }) => ($solid ? buttonColorMap.solid : buttonColorMap.outline)}
  ${({ size = 'sm' }) => buttonSizeMap[size]}
`;

export default Button;
