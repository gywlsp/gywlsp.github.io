import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import AboutMeMd from 'src/contents/about-me.mdx';

export default function AboutMe() {
  return (
    <MDXProvider
      components={{
        h1: H1,
        h2: H2,
        img: Img,
        ul: Ul,
        li: Li,
      }}
    >
      <AboutMeMd />
    </MDXProvider>
  );
}

export const H1 = styled.h1`
  font-size: 2.4rem;
  margin: 1.6rem 0;
`;

export const H2 = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

export const Img = styled.img`
  width: 100%;
  max-width: 40rem;
  margin: 0.8rem 0;
`;

export const Ul = styled.ul`
  padding-inline-start: 3.2rem;
`;

export const Li = styled.li`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
`;
