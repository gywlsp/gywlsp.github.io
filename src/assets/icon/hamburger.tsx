import React from 'react';

import { BLUE } from 'src/constants/colors';
import { IconProps } from './icons';

export default function HamburgerIcon({ style = {}, fill = BLUE }: IconProps) {
    return (
        <svg
            style={{ width: '4rem', height: '4rem', ...style }}
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
        >
            <path
                fill="none"
                stroke={fill}
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M50 25L0 25M50 10L0 10M0 40L50 40"
            />
        </svg>
    );
}
