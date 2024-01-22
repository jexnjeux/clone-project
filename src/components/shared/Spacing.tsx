import styled from 'styled-components';

interface SpacingProps {
  size: number;
  direction?: 'horizontal' | 'vertical';
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'horizontal ' }) =>
    direction === 'horizontal' ? `width: ${size}px` : `height: ${size}px`}
`;

export default Spacing;
