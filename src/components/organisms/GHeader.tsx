import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import HamburgerIcon from 'src/assets/icon/hamburger';
import { Img } from '../atoms';
import { WHITE } from 'src/constants/colors';

export type GHeaderProps = {
  onMobileGNBOpen: () => void;
};

function GHeader({ onMobileGNBOpen }: GHeaderProps) {

  return (
    <Wrapper>
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
          textDecoration: `none`
        }}
        to="/"
      >
        <Img src="/images/logo.svg" width="2.8rem" alt="logo" />
      </Link>
      <Button onClick={onMobileGNBOpen}>
        <HamburgerIcon style={{ width: '2.6rem', height: '2.6rem' }} />
      </Button>
    </Wrapper>
  );
}

export default React.memo(GHeader);

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 6.4rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  @media (min-width: 768px) {
    display: none;
  }
  background-color: ${WHITE};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px 0px;
`;

const Button = styled.button`
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
`;