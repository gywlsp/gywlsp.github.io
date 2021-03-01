import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { BLACK, LIGHT_GREY, MIDDLE_GREY } from 'src/constants/colors';

export type PostPreviewCardSmallProps = {
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    title: string;
    tags: string[];
  };
  thumbnail: FluidObject;
};

function PostPreviewCardSmall({
  fields,
  frontmatter,
  thumbnail,
}: PostPreviewCardSmallProps) {
  const { date, title } = frontmatter;

  return (
    <Wrapper to={fields.slug}>
      <Img
        fluid={thumbnail}
        style={{
          width: '100%',
          objectFit: 'cover',
          backgroundColor: '#fff',
          marginBottom: '1.2rem',
          border: `0.1px solid ${LIGHT_GREY}`,
        }}
      />
      <Title>{title || fields.slug}</Title>
      <Small>{moment(date).format('YYYY.MM.DD')}</Small>
    </Wrapper>
  );
}

export default React.memo(PostPreviewCardSmall);

const Wrapper = styled(Link)`
  width: 25.6rem;
  margin: 0 0.8rem 2rem 0;
  color: ${BLACK};
  box-shadow: none;
  text-decoration: none;
  word-break: break-all;
`;

const Title = styled.p`
  width: 100%;
  height: 5.2rem;
  margin: 0;
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const Small = styled.small`
  font-weight: 400;
  font-size: 1.2rem;
  color: ${MIDDLE_GREY};
  margin-top: 0.8rem;
`;
