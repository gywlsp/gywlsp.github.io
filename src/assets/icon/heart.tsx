
import React from 'react';
import { BLACK } from "../../constants/colors";

export default function HeartIcon({ style = {}, fill = BLACK }) {
    return (
        <svg style={{
            width: '2rem',
            height: '2rem',
            ...style
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill={fill} d="M14.57,1.31A5.5,5.5,0,0,0,10,3.78a5.45,5.45,0,0,0-10,3A5.44,5.44,0,0,0,1,10a10.27,10.27,0,0,0,1.35,1.44l.51.48,7.13,7,5.16-5.09,2-2a15.09,15.09,0,0,0,1.6-1.71,5.25,5.25,0,0,0,1.27-3.36A5.49,5.49,0,0,0,14.57,1.31Z" />
        </svg>
    );
}
