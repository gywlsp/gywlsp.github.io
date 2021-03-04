import React, { useState, ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';

import GNB from 'src/components/organisms/GNB';
import GHeader from '../organisms/GHeader';
import ScrollToTopButton from '../atoms/buttons/scroll-to-top';

export type LayoutProps = {
  pathname: string;
  children: ReactNode | ReactNodeArray;
  selectedTag?: string;
  tags: {tag: string, totalCount: number}[];
};

function Layout({ pathname, children, tags, selectedTag }: LayoutProps) {
  const [isMobileGNBOpen, setMobileGNBOpen] = useState(false);

  const toggleMobileGNBOpen = (open: boolean) => () => setMobileGNBOpen(open);

  return (
    <Wrapper>
      <GNB
        {...{
          pathname,
          tags,
          selectedTag,
          isMobileGNBOpen,
          onClose: toggleMobileGNBOpen(false),
        }}
      />
      <GHeader onMobileGNBOpen={toggleMobileGNBOpen(true)} />
      <Main>
        {children}
        <ScrollToTopButton />
      </Main>
    </Wrapper>
  );
}

export default React.memo(Layout);

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  width: calc(100% - 520px);
  min-height: 100vh;
  padding: 4.2rem 3rem;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: calc(100% - 260px);
  }
  @media (max-width: 767px) {
    width: 100%;
    padding: 2rem 1.6rem;
    margin-top: 6rem;
  }
`;
