import React, { ReactChild } from 'react';
import styled from 'styled-components';

import GNB from 'src/components/organisms/GNB';

export type LayoutProps = {
  pathname: string;
  children: ReactChild;
  selectedTag?: string;
};

function Layout({ pathname, children, selectedTag }) {
  return (
    <Wrapper>
      <GNB {...{ pathname, selectedTag }} />
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
  flex: 1;
  padding: 3rem;
  min-height: 100vh;
`;
