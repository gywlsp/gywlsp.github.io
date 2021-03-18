import React, { useState, ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';

import GNB from 'src/components/organisms/GNB';
import GHeader from '../organisms/GHeader';
import ScrollToTopButton from '../atoms/buttons/scroll-to-top';
import { WHITE, LIGHT_BLUE } from 'src/constants/colors';

export type LayoutProps = {
  pathname: string;
  children: ReactNode | ReactNodeArray;
  selectedTag?: string;
  tags: { tag: string; totalCount: number }[];
};

function Layout({ pathname, children, tags, selectedTag }: LayoutProps) {
  const [isMobileGNBOpen, setMobileGNBOpen] = useState(false);

  const toggleMobileGNBOpen = (open: boolean) => () => setMobileGNBOpen(open);

  return (
    <Wrapper>
      <GHeader onMobileGNBOpen={toggleMobileGNBOpen(true)} />
      <GNB
        {...{
          pathname,
          tags,
          selectedTag,
          isMobileGNBOpen,
          onClose: toggleMobileGNBOpen(false),
        }}
      />
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
  padding: 4rem 32px;
  background-color: ${LIGHT_BLUE};
  @media (max-width: 1024px) {
    background-color: ${WHITE};
    padding: 0;
  }
`;

const Main = styled.main`
  position: relative;
  width: calc(100% - 260px - 1.6rem);
  min-height: calc(100vh - 8rem);
  padding: 3.6rem 3rem;
  margin-left: 1.2rem;
  background-color: ${WHITE};
  @media (max-width: 1024px) {
    width: 100%;
    padding: 2rem 1.6rem;
    margin-top: 5.2rem;
    margin-left: 0;
  }
`;
