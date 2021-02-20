import React, { createRef, useLayoutEffect } from 'react';

export interface IUtterancesProps {
  repo: string;
}

export default function Utterances({ repo }: IUtterancesProps) {
  const containerRef = createRef<HTMLDivElement>();
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

    containerRef.current!.appendChild(utterances);
  }, [repo]);

  return <div ref={containerRef} />;
}
