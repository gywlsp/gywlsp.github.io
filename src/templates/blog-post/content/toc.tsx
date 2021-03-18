import React from 'react';
import { NAVY } from 'src/constants/colors';
import styled, { css } from 'styled-components';

export type BlogPostTemplateTableOfContentsProps = {
  content: string;
  currentHeaderHref: string;
};

export default function BlogPostTemplateTableOfContents({
  content,
  currentHeaderHref,
}: BlogPostTemplateTableOfContentsProps) {
  const selectedHeaderCSS = css`
    li a[href='${currentHeaderHref}'] {
      font-weight: bold;
      color: ${NAVY};
    }
  `;

  return (
    <Wrapper>
      <Title>TABLE OF CONTENTS</Title>
      <TOC
        css={selectedHeaderCSS}
        className="tableOfContent"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: sticky;
  flex: 1;
  top: 2rem;
  left: 2.8rem;
  margin-top: 8.8rem;
  margin-left: 2.8rem;
  height: fit-content;
  @media (max-width: 1400px) {
    display: none;
  }
`;

const Title = styled.p`
  font-size: 1.4rem;
  margin: 0;
  margin-bottom: 1.2rem;
  font-weight: bold;
`;

const TOC = styled.div`
  flex: 1;
`;
