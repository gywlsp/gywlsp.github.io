import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

export interface ICommentSectionProps {
  repo: string;
}

export default function CommentSection({ repo }: ICommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const scriptElement = document.createElement('script');

    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo,
      theme: 'github-light',
      'issue-term': 'pathname',
      label: '💬 comments',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      scriptElement.setAttribute(key, value);
    });

    containerRef?.current?.appendChild(scriptElement);
  }, [repo]);

  return <Div ref={containerRef} />;
}

const Div = styled.div`
  width: calc(100% - 260px - 1.6rem);
  @media (max-width: 1400px) {
    width: 100%;
  }
`;
