import React from 'react';
import { IconProps } from '../icons';

import { BLUE } from 'src/constants/colors';

export default function ArrowRightIcon({
    style = {},
    fill = BLUE
}: IconProps) {
    return (
        <svg
            style={{ width: '2rem', height: '2rem', ...style }}
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <polygon points="0 10.76 17.09 10.76 8.71 18.94 9.76 20.01 20 10.01 9.76 0.01 8.71 1.08 17.09 9.26 0 9.26 0 10.76" />{' '}
        </svg>
    );
}
