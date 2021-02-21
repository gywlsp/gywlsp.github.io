import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { BLUE, WHITE } from 'src/constants/colors';

export type TagProps = {
    title: string;
};

function Tag({ title }: TagProps) {
    return (
        <Link to={`/posts?tag=${title}`}>
            <Wrapper>
                <P>{title}</P>
            </Wrapper>
        </Link>
    )
}

export default React.memo(Tag);

const Wrapper = styled.div`
    padding: 0.4rem 0.8rem;
    background-color: ${BLUE};
    margin-right: 0.8rem;
    margin-bottom: 0.8rem;
`;

const P = styled.p`
    color: ${WHITE};
    font-size: 1.2rem;
    margin: 0;
`;