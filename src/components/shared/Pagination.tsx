import styled from 'styled-components';
import usePagination from '../../hooks/usePagination';
import Button from './Button';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';
import { ELLIPSIS } from '../../constants/pagination';
import { device, spacing } from '../../styles/theme';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onChangePage: (page: number | string) => void;
  onClickArrow: (direction: 'left' | 'right') => void;
}

function Pagination({
  totalPage,
  currentPage,
  onChangePage,
  onClickArrow,
}: PaginationProps) {
  const pages: (number | string)[] = usePagination(totalPage, currentPage);

  return (
    <Container>
      <ArrowButton
        onClick={() => void onClickArrow('left')}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </ArrowButton>
      {pages.includes(ELLIPSIS) ? <ButtonWrap /> : null}
      {pages.map((page: string | number, idx) => {
        return currentPage === page ? (
          <ButtonWrap key={idx}>
            <Button $solid size="lg" onClick={() => void onChangePage(page)}>
              <li>{page}</li>
            </Button>
          </ButtonWrap>
        ) : (
          <ButtonWrap key={idx}>
            <StyledButton size="lg" onClick={() => void onChangePage(page)}>
              {page}
            </StyledButton>
          </ButtonWrap>
        );
      })}
      {pages.includes(ELLIPSIS) ? <ButtonWrap /> : null}
      <ArrowButton
        onClick={() => void onClickArrow('right')}
        disabled={currentPage === totalPage}
      >
        <ArrowRightIcon />
      </ArrowButton>
    </Container>
  );
}

export default Pagination;

const Container = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing.xl};

  @media ${device.mobileL} {
    gap: ${spacing.xs};
  }
`;

const ButtonWrap = styled.div`
  width: 40px;
`;

const StyledButton = styled(Button)`
  border: none;
`;

const ArrowButton = styled.button`
  margin-top: 2px;
`;
