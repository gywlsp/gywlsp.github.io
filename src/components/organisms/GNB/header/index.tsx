import React from 'react';
import styled from 'styled-components';

import Logo from './logo';
import { WHITE } from 'src/constants/colors';

function GNBHeader() {
  return (
    <HeaderWrapper>
      <Logo />
    </HeaderWrapper>
  );
}

export default React.memo(GNBHeader);

const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  background-color: ${WHITE};
`;
