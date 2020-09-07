import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Img } from '../../atoms';

export default function Logo() {
  return (
    <Link
      style={{
        boxShadow: `none`,
        color: `inherit`,
        textDecoration: `none`
      }}
      to={`/`}
    >
      <Wrapper>
        <Img
          src="https://avatars1.githubusercontent.com/u/47051596?s=460&u=5770a571dd6d4be00d7839e04fc9715d390d0714&v=4"
          width="80px"
          height="80px"
          alt="profile_image"
          circle
        />
        <BlogName>gywlsp devlog</BlogName>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 24px;
`;

const BlogName = styled.p`
  margin: 0;
  margin-left: 20px;
  font-size: 28px;
  font-family: 'Permanent Marker', cursive;
  color: #202020;
`;
