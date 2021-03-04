import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { WHITE, POINT_BLUE, SKY_BLUE } from 'src/constants/colors';

export type TagProps = { name: string; isSelected?: boolean; count?: number };

function Tag({ name, isSelected=false, count }: TagProps) {
  return (
    <Wrapper to={name === 'ALL' ? '/posts' : `/posts?tag=${name}`}>
      <P isSelected={isSelected}>
        #{name}
        {count ? ` ${count}` : ''}
      </P>
    </Wrapper>
  );
}

export default React.memo(Tag);

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  box-shadow: none;
  color: inherit;
  text-decoration: none;
  margin-bottom: 0.8rem;
`;

const P = styled.p<{ isSelected: boolean }>`
  white-space: pre;
  margin: 0rem;
  margin-right: 0.4rem;
  padding: 0.2rem 0.6rem;
  font-size: 1.2rem;
  font-weight: 500;
  @media (max-width: 481px) {
    html {
      font-size: 1.4rem;
    }
  }
  ${({ isSelected }) =>
    isSelected
      ? `
  color: ${WHITE};
  background-color: ${POINT_BLUE};
  border: 0.1rem solid ${POINT_BLUE};`
      : `
  color: ${POINT_BLUE};
  background-color: ${WHITE};
  border: 0.1rem solid ${SKY_BLUE};`}
  border-radius: 0.4rem;
`;
