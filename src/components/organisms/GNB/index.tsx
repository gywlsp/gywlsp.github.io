import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from './logo';
import Profile from './profile';
import HeartIcon from 'src/assets/icon/heart';
import { BLACK, LIGHT_GREY } from 'src/constants/colors';

export type GNBProps = {
  pathname: string;
  selectedTag?: string;
};

const TAG_LIST = ['ALL', 'Javascript', 'Algorithm', 'React'];

function GNB({ selectedTag, pathname }: GNBProps) {
  return (
    <Wrapper id="GNB">
      <Logo />
      <Profile />
      <Ul isPrimary={true}>
        <Li>
          <NavLink to="/">
            <Category>ABOUT ME</Category>
          </NavLink>
        </Li>
        <Li>
          <NavLink to="/posts">
            <Category>POSTS</Category>
          </NavLink>
        </Li>
        <Ul isPrimary={false}>
          {TAG_LIST.map((tag) => (
            <Li key={tag}>
              <NavLink to={tag === 'ALL' ? '/posts' : `/posts/?tag=${tag}`}>
                <HeartIcon
                  style={{ width: '16px', height: '16px', marginRight: '12px' }}
                  fill={
                    pathname?.includes('/posts') && tag === selectedTag
                      ? BLACK
                      : LIGHT_GREY
                  }
                />
                <P>{tag}</P>
              </NavLink>
            </Li>
          ))}
        </Ul>
        <Li>
          <NavLink to="/projects">
            <Category>PROJECTS</Category>
          </NavLink>
        </Li>
      </Ul>
    </Wrapper>
  );
}

export default React.memo(GNB);

const Wrapper = styled.nav`
  width: 260px;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  background-color: #8f91a9;
  padding: 24px 30px;
`;

const Ul = styled.ul<{ isPrimary: boolean }>`
  padding-left: ${(props) => (props.isPrimary ? '0' : '20px')};
  margin-bottom: 36px;
  list-style-type: none;
`;

const Li = styled.li`
  margin-bottom: 16px;
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
  font-size: 24px;
  color: ${BLACK};
  font-weight: 700;
`;

const P = styled.p`
  margin: 0;
  font-size: 20px;
  color: ${BLACK};
  font-weight: 700;
`;
