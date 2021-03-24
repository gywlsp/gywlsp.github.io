import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import { Img as AtomImage } from 'src/components/atoms';
import AboutMeMd from 'src/contents/about-me.mdx';
import { LIGHT_BLUE, POINT_BLUE, SKY_BLUE } from 'src/constants/colors';

export default function AboutMe() {
  return (
    <MDXProvider
      components={{
        h2: H2,
        h3: H3,
        img: Img,
        ul: Ul,
        li: Li,
      }}
    >
      <Wrapper>
        <Circle>
          <AtomImage src="/images/logo.svg" width="3.2rem" alt="logo" />
        </Circle>
        <TitleWrapper>
          <Title>사이다 데브-로그</Title>
          <Description>
            사이다를 마신 것 같이 시원하게 이해가 잘 되는 글들로 이루어진{' '}
            <Strong>기술 블로그</Strong>입니다.
          </Description>
        </TitleWrapper>
      </Wrapper>
      <AboutMeMd />
    </MDXProvider>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Circle = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color ${LIGHT_BLUE};
`;

const TitleWrapper = styled.div`
  flex: 1;
  margin-left: 0.8rem;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 0.2rem;
  font-family: 'paybooc-Bold';
  font-size: 1.6rem;
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: ${SKY_BLUE};
`;

const Strong = styled.strong`
  color: ${POINT_BLUE};
  font-weight: 400;
`;

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 1.6rem;
`;

export const H3 = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.8rem;
`;

export const Img = styled.img`
  width: 100%;
  max-width: 40rem;
  margin: 0.8rem 0;
`;

export const Ul = styled.ul`
  padding-inline-start: 3.2rem;
  margin: 0;
  margin-bottom: 1.2rem;
`;

export const Li = styled.li`
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
`;
