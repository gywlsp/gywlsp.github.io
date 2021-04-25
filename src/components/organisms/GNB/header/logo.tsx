import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import LogoIcon from 'src/assets/icon/logo';
import { LIGHT_BLUE } from 'src/constants/colors';

export default function Logo() {
  return (
    <Link
      style={{
        boxShadow: `none`,
        color: `inherit`,
        textDecoration: `none`,
      }}
      to="/"
    >
      <Wrapper>
        <Circle>
          <LogoIcon style={{ width: '48px', height: '70px' }} />
        </Circle>
        <P>
          사이다
          <br />
          데브-로그
        </P>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  flex: 1;
  width: fit-content;
  margin: 0 auto;
`;

const Circle = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color ${LIGHT_BLUE};
`;

const P = styled.p`
  margin: 0;
  margin-left: 12px;
  font-size: 24px;
  font-family: 'paybooc-Bold';
  margin-bottom: 2px;
  color: #202020;
`;
