import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Img } from 'src/components/atoms';


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
        <Img src="/images/logo.svg" width="72px" alt="logo" />
        <NameWrapper>
          <Kor>사이다<br />데브-로그</Kor>
          <Eng>CIDER DEVLOG</Eng>
        </NameWrapper>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  align-items: flex-end;
  flex: 1;
  width: fit-content;
  margin: 0 auto;
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