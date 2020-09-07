import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import styled from 'styled-components';

import { BLACK, LIGHT_GREY } from 'src/constants/colors';
import { Tag } from 'src/components/atoms';

function PostPreviewCard({ excerpt, fields, frontmatter }) {
    const { date, description, tags, title } = frontmatter;

    return (
        <Wrapper key={fields.slug}>
            <header>
                <H2>
                    <StyledLink to={fields.slug}>{title || fields.slug}</StyledLink>
                </H2>
                <Row>
                    {tags.map((tag) => (
                        <Tag title={tag} />
                    ))}
                </Row>
            </header>
            <section>
                <P
                    dangerouslySetInnerHTML={{
                        __html: description || excerpt
                    }}
                />
                <Small>{moment(date).format('YYYY.MM.DD')}</Small>
            </section>
        </Wrapper>
    );
}

export default React.memo(PostPreviewCard);

const Wrapper = styled.article`
    padding: 1.6rem 0;
    border-bottom 0.1rem solid ${LIGHT_GREY};
`;

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: ${BLACK};
`;

const H2 = styled.h2`
  margin: 1.2rem 0;
  font-size: 2rem;
`;

const Row = styled.div`
  display: flex;
`;

const P = styled.p`
  color: ${BLACK};
  font-weight: 400;
  font-size: 1.4rem;
  margin: 1.4rem 0 1.2rem;
`;

const Small = styled.small`
  font-weight: 300;
  font-size: 1.4rem;
`;
