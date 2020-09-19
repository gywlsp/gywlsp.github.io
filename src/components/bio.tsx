/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { Img } from './atoms';
import { BLACK } from 'src/constants/colors';

export default function Bio() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <Wrapper to="/about-me">
      <Img
        src="/images/profile-image.jpeg"
        width="10rem"
        height="10rem"
        alt="profile-image"
        circle
        cover
        style={{ marginRight: '2rem' }}
      />
      <P>
        <strong>{author.name}</strong>
        <br />
        EWHA. W. UNIV. CSE 18
        <br />
        FRONT-END DEVELOPER
        <br />
      </P>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: ${BLACK};
  display: flex;
  flex: 1;
  margin: 2.8rem 0;
  align-items: center;
`;

const P = styled.p`
  font-size: 1.6rem;
  margin: 0;
`;
