import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import HamburgerIcon from 'src/assets/icon/hamburger';
import LogoIcon from 'src/assets/icon/logo';
import { WHITE } from 'src/constants/colors';

import { useScrollDirection } from 'src/hooks/utils';

export type GHeaderProps = {
  onMobileGNBOpen: () => void;
};

function GHeader({ onMobileGNBOpen }: GHeaderProps) {
  const scrollDirection = useScrollDirection('up');

  return (
    <Wrapper showHeader={scrollDirection === 'up'}>
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
          textDecoration: `none`,
        }}
        to="/"
      >
        <LogoIcon style={{ width: '2.4rem', height: '3.6rem' }} />
      </Link>
      <Button onClick={onMobileGNBOpen}>
        <HamburgerIcon style={{ width: '2.8rem', height: '2.8rem' }} />
      </Button>
    </Wrapper>
  );
}

export default React.memo(GHeader);

const Wrapper = styled.header<{ showHeader: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 5.2rem;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(0, ${({ showHeader }) => (showHeader ? 0 : '-5.2rem')});
  transition: all 0.5s;
  width: 100%;
  z-index: 100;
  @media (min-width: 1025px) {
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
