import React from 'react';
import styled from 'styled-components';

import ChevronUpIcon from 'src/assets/icon/chevron/up';
import { BLUE, WHITE } from 'src/constants/colors';

import { useScrollY } from 'src/hooks/utils';

export default function ScrollToTopButton() {
  const scrollY = useScrollY();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrapper showButton={scrollY > 100} onClick={handleClick}>
      <ChevronUpIcon
        style={{ width: '1.6rem', height: '1.6rem' }}
        fill={BLUE}
      />
    </Wrapper>
  );
}

const Wrapper = styled.button<{ showButton: boolean }>`
  position: fixed;
  right: ${({ showButton }) => (showButton ? '1.6rem' : '-4.8rem')};
  bottom: 1.6rem;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  background-color: ${WHITE};
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 1px 2px rgb(0 0 0 / 23%);
`;
