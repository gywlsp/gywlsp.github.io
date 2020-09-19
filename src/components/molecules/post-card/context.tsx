import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import ArrowLeftIcon from 'src/assets/icon/arrow/left';
import ArrowRightIcon from 'src/assets/icon/arrow/right';
import { BLACK, BLUE, LIGHT_BLUE } from 'src/constants/colors';

export type ContextType = 'previous' | 'next';

export type ContextPostCardProps = {
  type: ContextType;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
};

export default function ContextPostCard({
  type,
  fields,
  frontmatter,
}: ContextPostCardProps) {
  return (
    <Wrapper to={fields.slug} type={type}>
      {type === 'previous' && (
        <Circle style={{ marginRight: '1.2rem' }}>
          <ArrowLeftIcon />
        </Circle>
      )}
      <div>
        <Label>{type === 'previous' ? '이전' : '다음'} 포스트</Label>
        <Title>{frontmatter.title}</Title>
      </div>
      {type === 'next' && (
        <Circle style={{ marginLeft: '1.2rem' }}>
          <ArrowRightIcon />
        </Circle>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Link) <{ type: ContextType }>`
  box-shadow: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${LIGHT_BLUE};
  ${props => props.type === "previous" ? "margin-right: auto" : "margin-left: auto"};
  margin-bottom: 1.2rem;
  @media (max-width: 1499px) {
    width: 100%;
  }
  @media (min-width: 1500px) {
    width: 48%;
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.8rem;
  align-items: center;
  border: 0.1rem solid ${BLUE};
  border-radius: 99999px;
`;

const Label = styled.p`
  margin: 0;
  margin-bottom: 0.4rem;
  font-size: 1.4rem;
  color: ${BLACK};
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${BLACK};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
