import React, { useState, ReactChild } from 'react';
import styled from 'styled-components';

import GNB from 'src/components/organisms/GNB';
import GHeader from '../organisms/GHeader';

export type LayoutProps = {
  pathname: string;
  children: ReactChild;
  selectedTag?: string;
};

function Layout({ pathname, children, selectedTag }) {
  const [isMobileGNBOpen, setMobileGNBOpen] = useState(false);

  const toggleMobileGNBOpen = (open: boolean) => () => setMobileGNBOpen(open);

  return (
    <Wrapper>
      <GNB {...{ pathname, selectedTag, isMobileGNBOpen, onClose: toggleMobileGNBOpen(false) }} />
      <GHeader onMobileGNBOpen={toggleMobileGNBOpen(true)} />
      <Main>{children}</Main>
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
  width: calc(100% - 260px);
  padding: 3rem;
  @media (max-width: 767px) {
    width: 100%;
    padding: 1.6rem;
    margin-top: 6rem;
  }
  max-width: 1280px;
  min-height: 100vh;
`;
