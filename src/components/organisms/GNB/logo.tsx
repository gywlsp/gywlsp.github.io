import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';


export default function Logo() {

  const { avatar } = useStaticQuery(graphql`
  query ProfileQuery {
    avatar: file(absolutePath: { regex: "/cyder.png/" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`);

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
        <Image style={{ width: '72px' }} fluid={avatar.childImageSharp.fluid} className="logo" />
        <BlogName>사이다<br />데브-로그</BlogName>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
  margin-bottom: 24px;
`;

const BlogName = styled.p`
  margin: 0;
  font-size: 24px;
  font-family: 'paybooc-Bold';
  margin-left: 12px;
  margin-bottom: 8px;
  color: #202020;
`;