import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Img } from 'src/components/atoms';
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
          <Img src="/images/logo.svg" width="52px" alt="logo" />
        </Circle>
        <NameWrapper>
          <Kor>
            사이다
            <br />
            데브-로그
          </Kor>
        </NameWrapper>
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
  width: 92px;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color ${LIGHT_BLUE};
`;

const NameWrapper = styled.div`
  margin-left: 12px;
`;

const Kor = styled.p`
  margin: 0;
  font-size: 24px;
  font-family: 'paybooc-Bold';
  margin-bottom: 2px;
  color: #202020;
`;

const Eng = styled.p`
  font-size: 18px;
  margin: 0px;
`;