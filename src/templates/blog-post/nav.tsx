import React from 'react';
import styled from 'styled-components';

import ContextPostCard, {
  ContextPostCardProps,
} from 'src/components/molecules/post-card/context';

export type BlogPostTemplateNavProps = {
  previous: ContextPostCardProps;
  next: ContextPostCardProps;
};

function BlogPostTemplateNav({ next, previous }: BlogPostTemplateNavProps) {
  return (
    <Wrapper>
      {next && <ContextPostCard type="next" {...next} />}
      {previous && <ContextPostCard type="previous" {...previous} />}
    </Wrapper>
  );
}

export default React.memo(BlogPostTemplateNav);

const Wrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: calc(100% - 260px - 1.6rem);
  @media (max-width: 1400px) {
    width: 100%;
  }
  margin-top: 2rem;
`;
