import React from 'react';
import styled from 'styled-components';

import { LIGHT_PURPLE, BLACK } from 'src/constants/colors';

export type TagProps = {
    title: string;
};

function Tag({ title }: TagProps) {
    return (
        <Wrapper>
            <P>{title}</P>
        </Wrapper>
    )
}

export default React.memo(Tag);

const Wrapper = styled.div`
    padding: 0.8rem 1rem;
    background-color: ${LIGHT_PURPLE};
    border-radius: 0.4rem;
    margin-right: 0.8rem;
`;

const P = styled.p`
    color: ${BLACK};
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
`;