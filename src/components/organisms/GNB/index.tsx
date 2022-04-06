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

  return (
    <OverlayWrapper isMobileGNBOpen={isMobileGNBOpen} onClick={onClose}>
      <Wrapper id="GNB" isMobileGNBOpen={isMobileGNBOpen}>
        <Header />
        <TagsSection
          pathname={pathname}
          tags={tags}
          selectedTag={selectedTag}
          onClose={onClose}
        />
      </Wrapper>
    </OverlayWrapper>
  );
}

export default React.memo(GNB);

const OverlayWrapper = styled.div<{ isMobileGNBOpen: boolean }>`
  @media (max-width: 1024px) {
    position: fixed;
    z-index: 999;
    display: flex;
    flex: 1 0 auto;
    width: 100%;
    ${(props) =>
      props.isMobileGNBOpen
        ? 'height: 100vh; background-color: rgba(0, 0, 0, 0.3)'
        : 'height: auto; background-color: rgba(0, 0, 0, 0)'};
    transition: background-color 0.3s;
    overflowx: auto;
    outline: 0;
  }
`;

const Wrapper = styled.nav<{ isMobileGNBOpen: boolean }>`
  position: sticky;
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100%;
  padding: 3.6rem 22px 2.4rem;
  background-color: ${WHITE};
  overflow-x: hidden;
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(
      ${({ isMobileGNBOpen }) => (isMobileGNBOpen ? 0 : '-260px')}
    );
    transition: all 0.3s;
    z-index: 9999;
    padding-top: 4.4rem;
    box-shadow: 2px 0 2px -2px ${MIDDLE_GREY};
  }
`;
