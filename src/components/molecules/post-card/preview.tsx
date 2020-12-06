import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { BLACK, LIGHT_GREY, MIDDLE_GREY } from 'src/constants/colors';
import { Tag } from 'src/components/atoms';

export type PostPreviewCardProps = {
  excerpt: string;
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

function PostPreviewCard({
  //excerpt,
  fields,
  frontmatter,
  thumbnail,
}: PostPreviewCardProps) {
  const { date, tags, title } = frontmatter;

  return (
    <Wrapper to={fields.slug}>
      <Img
        fluid={thumbnail}
        style={{
          width: '100%',
          height: '16rem',
          objectFit: 'cover',
          backgroundColor: '#fff',
          marginBottom: '1.2rem',
          border: `0.1px solid ${LIGHT_GREY}`,
        }}
      />
      <Title>{title || fields.slug}</Title>
      <Row>
        {tags?.map((tag) => (
          <Tag key={tag} title={tag} />
        ))}
      </Row>
      <Small>{moment(date).format('YYYY.MM.DD')}</Small>
    </Wrapper>
  );
}

export default React.memo(PostPreviewCard);

const Wrapper = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  width: 100%;
  overflow: hidden;
  color: ${BLACK};
  @media (min-width: 1280px) {
    min-width: 392px;
    width: 48%;
  }
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  margin-bottom: 0.8rem;
`;

const Row = styled.div`
  display: flex;
`;

const Small = styled.small`
  font-weight: 400;
  font-size: 1.4rem;
  color: ${MIDDLE_GREY};
  margin-top: 0.8rem;
`;
