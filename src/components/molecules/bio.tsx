import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { Img } from '../atoms';
import { BLACK } from 'src/constants/colors';

function Bio() {
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
    <Wrapper>
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
        Front-end Developer
        <br />
        <a
          target="_blank"
          href="https://gywlsp.notion.site/gywlsp/gywlsp-8073dc1ab1d346dfa75bdef108e88783"
        >
          About ME ✨
        </a>
        <br />
      </P>
    </Wrapper>
  );
}

export default React.memo(Bio);

const Wrapper = styled.div`
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
