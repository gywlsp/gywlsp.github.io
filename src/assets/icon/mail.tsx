import React from 'react';

import { IconProps } from './icons';
import { BLACK } from 'src/constants/colors';

export default function MailIcon({ style = {}, fill = BLACK }: IconProps) {
    return (
        <svg
            style={{ width: '5rem', height: '5rem', ...style }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
        >
            <path
                fill={fill}
                d="M 0 7 L 0 8 L 0 43 L 50 43 L 50 7 L 0 7 z M 2 9 L 48 9 L 48 41 L 2 41 L 2 9 z M 4 13.916016 L 4 16.275391 L 25 28.179688 L 46 16.275391 L 46 13.916016 L 25 25.820312 L 4 13.916016 z"
            />
        </svg>
    );
}
