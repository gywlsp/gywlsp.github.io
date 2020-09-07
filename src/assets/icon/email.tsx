import React from 'react';

import { IconProps } from './icons';
import { BLACK } from "src/constants/colors";

export default function EmailIcon({ style = {}, fill = BLACK }: IconProps) {
    return (
        <svg
            style={{
                width: '1.6rem',
                height: '1.2rem',
                ...style
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 14"
        >
            <path
                fill={fill}
                d="M18,5H6A2.476,2.476,0,0,0,3.5,7.5v9A2.476,2.476,0,0,0,6,19H18a2.476,2.476,0,0,0,2.5-2.5v-9A2.476,2.476,0,0,0,18,5Zm0,2a.367.367,0,0,1,.3.1L12,11.5,5.7,7.1A.367.367,0,0,1,6,7Zm0,10H6a.472.472,0,0,1-.5-.5V9.4l5.9,4.1a1.421,1.421,0,0,0,.6.2,1.421,1.421,0,0,0,.6-.2l5.9-4.1v7.1A.472.472,0,0,1,18,17Z"
                transform="translate(-3.5 -5)"
            />
        </svg>
    );
}
