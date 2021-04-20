import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

export interface IUtterancesProps {
  repo: string;
}

export default function Utterances({ repo }: IUtterancesProps) {
  const containerRef = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const utterances = document.createElement('script');

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
      utterances.setAttribute(key, value);
    });

    containerRef?.current?.appendChild(utterances);
  }, [repo]);

  return <Div ref={containerRef} />;
}

const Div = styled.div`
  width: calc(100% - 260px - 1.6rem);
  @media (max-width: 1400px) {
    width: 100%;
  }
`;
