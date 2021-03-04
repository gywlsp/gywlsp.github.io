import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Tag from './tag';
import { BLACK, WHITE, POINT_BLUE, SKY_BLUE } from 'src/constants/colors';

export type GNBTagsSectionProps = {
  pathname: string;
  tags: { tag: string; totalCount: number }[];
  selectedTag?: string;
  onClose: () => void;
};

function GNBTagsSection({
  tags,
  selectedTag,
  pathname,
  onClose,
}: GNBTagsSectionProps) {
  useEffect(() => {
    onClose();
  }, [selectedTag]);

  return (
    <Wrapper>
      <NavLink to="/posts">
        <Category>TAGS</Category>
      </NavLink>
      <Row>
        {tags.map(({ tag }) => (
          <Tag name={tag} isSelected={pathname?.includes('/posts') && tag === selectedTag}/>
        ))}
      </Row>
    </Wrapper>
  );
}

export default React.memo(GNBTagsSection);

const Wrapper = styled.div`
  width: 100%;
  background-color: ${WHITE};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 2rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  box-shadow: none;
  color: inherit;
  text-decoration: none;
  margin-bottom: 0.8rem;
`;

const Category = styled.p`
  margin: 0;
  font-size: 1.6rem;
  color: ${BLACK};
  font-weight: 600;
`;

const TagWrapper = styled.div<{ isSelected: boolean }>`
  margin-right: 0.4rem;
  padding: 0.2rem 0.6rem;
  font-size: 1.2rem;
  font-weight: 500;
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
