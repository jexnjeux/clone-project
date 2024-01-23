import { css } from 'styled-components';

const baseButtonColor = css`
  border-radius: 6px;
  color: ${({ theme }) => theme.palette.gray600};
  font-weight: bold;
`;

export const buttonColorMap = {
  solid: css`
    ${baseButtonColor};
    border: 1.2px solid ${({ theme }) => theme.palette.gray200};
    background-color: ${({ theme }) => theme.palette.gray200};
  `,
  outline: css`
    ${baseButtonColor};
    border: 1.2px solid ${({ theme }) => theme.palette.gray400};
    background-color: ${({ theme }) => theme.palette.white};
  `,
};

export const buttonSizeMap = {
  sm: css`
    padding: 2px 4px;
    font-size: ${({ theme }) => theme.font.xs};
  `,
  md: css`
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.font.sm};
  `,
  lg: css`
    padding: 6px 10px;
    font-size: ${({ theme }) => theme.font.md};
  `,
};

export type ButtonColor = keyof typeof buttonColorMap;
export type ButtonSize = keyof typeof buttonSizeMap;
