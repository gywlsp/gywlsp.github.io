import React from 'react';
import styled from 'styled-components';

import ChevronUpIcon from 'src/assets/icon/chevron/up';
import { BLUE, WHITE } from 'src/constants/colors';

export default function ScrollToTopButton() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper onClick={handleClick}>
      <ChevronUpIcon
        style={{ width: '1.6rem', height: '1.6rem' }}
        fill={BLUE}
      />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  position: sticky;
  top: calc(100% - 5.6rem);
  right: 1.6rem;
  left: calc(100% - 1.6rem);
  bottom: 1.6rem;
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
