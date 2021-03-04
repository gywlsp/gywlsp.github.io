import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Header from './header';
import TagsSection from './tags-section';
import { WHITE, MIDDLE_GREY } from 'src/constants/colors';

export type GNBProps = {
  pathname: string;
  tags: { tag: string; totalCount: number }[];
  selectedTag?: string;
  isMobileGNBOpen: boolean;
  onClose: () => void;
};

function GNB({
  tags,
  selectedTag,
  pathname,
  isMobileGNBOpen,
  onClose,
}: GNBProps) {
  useEffect(() => {
    onClose();
  }, [selectedTag]);

  const right = isMobileGNBOpen ? '0' : '100vw';

  return (
    <OverlayWrapper isMobileGNBOpen={isMobileGNBOpen} style={{ right }}>
      <Wrapper id="GNB" isMobileGNBOpen={isMobileGNBOpen} style={{ right }}>
        <Header />
        <TagsSection
          pathname={pathname}
          tags={tags}
          selectedTag={selectedTag}
          onClose={onClose}
        />
      </Wrapper>
      <Overlay onClick={onClose} />
    </OverlayWrapper>
  );
}

export default React.memo(GNB);

const OverlayWrapper = styled.div<{ isMobileGNBOpen: boolean }>`
  @media (max-width: 767px) {
    display: flex;
    flex: 1 0 auto;
    width: 100%;
    height: ${(props) => (props.isMobileGNBOpen ? '100vh' : 'auto')};
    z-index: 999;
    overflowx: auto;
    position: fixed;
    outline: 0;
    transition: right 0.3s ease-out;
  }
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  flex: 1;
`;

const Wrapper = styled.nav<{ isMobileGNBOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100vh;
  padding: 3.6rem 22px 2.4rem;
  position: sticky;
  overflow-x: hidden;
  @media (max-width: 767px) {
    z-index: 9999;
    padding-top: 6rem;
    ${(props) => !props.isMobileGNBOpen && `display: none;`}
    box-shadow: 2px 0 2px -2px ${MIDDLE_GREY};
  }
  @media (min-width: 768px) {
    top: 0;
  }
  background-color: ${WHITE};
`;
