import React from 'react';
import styled, { css } from 'styled-components';
import { buttonColorMap, buttonSizeMap } from '../../styles/button';

interface ButtonProps {
  children: React.ReactNode;
  $solid?: boolean;
  $cursorunset?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button = styled.button<ButtonProps>`
  ${({ $solid }) => ($solid ? buttonColorMap.solid : buttonColorMap.outline)}
  ${({ size = 'sm' }) => buttonSizeMap[size]}
  ${(props) =>
    props.$cursorunset &&
    css`
      cursor: unset;
    `}
`;

export default Button;
