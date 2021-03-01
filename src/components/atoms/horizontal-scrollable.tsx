import React, { ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';

export type HorizontalScrollableProps = {
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  children: ReactNode | ReactNodeArray;
  className?: string;
};

export default function HorizontalScrollable({
  style,
  containerStyle,
  children,
  className,
}: HorizontalScrollableProps) {
  return (
    <Wrapper style={style} className={className}>
      <Container style={containerStyle}>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;

  @media (min-width: 481px) {
    -ms-overflow-style: auto;
    &::-webkit-scrollbar {
      display: flex;
      height: 0.4rem;
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: none;
      width: 0.4rem;
      opacity: 1;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
`;
