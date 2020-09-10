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
        textDecoration: `none`,
        alignSelf: 'center',
        marginRight: '0.8rem'
      }}
      to={`/`}
    >
      <Wrapper>
        <Image style={{ width: '72px' }} fluid={avatar.childImageSharp.fluid} className="logo" />
        <NameWrapper>
          <Kor>사이다<br />데브-로그</Kor>
          <Eng>CIDER DEVLOG</Eng>
        </NameWrapper>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
  margin-left: 4px;
  margin-bottom: 24px;
`;

const NameWrapper = styled.div`
  margin-left: 12px;
`;

const Kor = styled.p`
  margin: 0;
  font-size: 24px;
  font-family: 'paybooc-Bold';
  margin-bottom: 2px;
  color: #202020;
`;

const Eng = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
`;