import React from 'react';
import styled from 'styled-components';

import { LIGHT_PURPLE, BLACK } from 'src/constants/colors';

export type TagProps = {
    title: string;
};

export default function Tag({ title }: TagProps) {
    return (
        <Wrapper>
            <P>{title}</P>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 0.6rem 0.8rem;
    background-color: ${LIGHT_PURPLE};
    border-radius: 0.4rem;
    margin-right: 0.8rem;
`;

const P = styled.p`
    color: ${BLACK};
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
`;