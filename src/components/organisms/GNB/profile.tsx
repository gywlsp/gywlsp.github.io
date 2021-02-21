import React from 'react';
import styled from 'styled-components';

import { Img } from 'src/components/atoms';
import { BLACK } from 'src/constants/colors';
import MailIcon from 'src/assets/icon/mail';

export default function Profile() {
    return (
        <Wrapper>
            <P><strong>박효진</strong> (@gywlsp)</P>
            <A href="mailto:gywls517@gmail.com" title="Email">
                <MailIcon
                    style={{ width: '18px', height: '18px', marginRight: '8px' }}
                />
            </A>
            <A href="https://github.com/gywlsp" title="Github">
                <Img
                    src="https://github.githubassets.com/favicons/favicon.svg"
                    alt="github"
                    width="18px"
                    height="18px"
                />
            </A>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0.2rem 0 0.4rem;
  width: 200px;
  margin-bottom: 2rem;
`;

const P = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${BLACK};
  margin-right: auto;
`;

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
`;
