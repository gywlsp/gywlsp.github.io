import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import EmailIcon from 'src/assets/icon/email';
import { Img } from 'src/components/atoms';
import { BLACK } from 'src/constants/colors';

export default function Profile() {
    return (
        <Wrapper>
            <A href="mailto:gywls517@gmail.com" title="Email">
                <EmailIcon
                    style={{ width: '20px', height: '15px', marginRight: '8px' }}
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
            <P>
                <Link
                    style={{
                        boxShadow: `none`,
                        color: `inherit`,
                        textDecoration: `none`
                    }}
                    to={`/`}
                >
                    ABOUT ME ＞
                </Link>
            </P>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  margin-bottom: 60px;
`;

const P = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${BLACK};
  font-weight: 700;
  margin-left: auto;
  line-height: 1.5;
`;

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
`;
