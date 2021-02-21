import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from './logo';
import Profile from './profile';
import {
  BLACK,
  WHITE,
  LIGHT_BLUE,
  BLUE,
  MIDDLE_GREY,
} from 'src/constants/colors';

export type GNBProps = {
  pathname: string;
  selectedTag?: string;
  isMobileGNBOpen: boolean;
  onClose: () => void;
};

const TAG_LIST = ['ALL', 'Javascript', 'Algorithm', 'React', 'React Native'];

function GNB({ selectedTag, pathname, isMobileGNBOpen, onClose }: GNBProps) {
  useEffect(() => {
    onClose();
  }, [selectedTag]);

  const right = isMobileGNBOpen ? '0' : '100vw';

  return (
    <OverlayWrapper isMobileGNBOpen={isMobileGNBOpen} style={{ right }}>
      <Wrapper id="GNB" isMobileGNBOpen={isMobileGNBOpen} style={{ right }}>
        <Logo />
        <Profile />
        <ListWrapper>
          <Ul isPrimary={true}>
            <Li>
              <NavLink to="/posts">
                <Category>POSTS</Category>
              </NavLink>
            </Li>
            <Ul isPrimary={false}>
              {TAG_LIST.map((tag) => (
                <Li key={tag}>
                  <NavLink to={tag === 'ALL' ? '/posts' : `/posts?tag=${tag}`}>
                    <Circle
                      isSelected={
                        pathname?.includes('/posts') && tag === selectedTag
                      }
                    />
                    <Tag>{tag}</Tag>
                  </NavLink>
                </Li>
              ))}
            </Ul>
          </Ul>
        </ListWrapper>
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
  flex: 1;
`;

const ListWrapper = styled.div`
  width: 200px;
`;

const Wrapper = styled.nav<{ isMobileGNBOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  height: 100vh;
  padding: 4rem 0 2.4rem;
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
  background-color: ${LIGHT_BLUE};
`;

const Ul = styled.ul<{ isPrimary: boolean }>`
  padding-left: ${(props) => (props.isPrimary ? '0' : '20px')};
  margin-bottom: 2rem;
  list-style-type: none;
`;

const Li = styled.li`
  margin-bottom: 0.8rem;
`;

const NavLink = styled(Link)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Category = styled.p`
  margin: 0;
  font-size: 1.8rem;
  color: ${BLACK};
  font-weight: 600;
`;

const Tag = styled.p`
  margin: 0;
  font-size: 1.6rem;
  color: ${BLACK};
`;

const Circle = styled.div<{ isSelected: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  margin-right: 12px;
  background-color: ${(props) => (props.isSelected ? BLUE : WHITE)};
  border: 0.1rem solid ${BLUE};
`;
