import React from 'react';
import { IconProps } from '../icons';

import { BLUE } from 'src/constants/colors';

export default function ArrowLeftIcon({ style = {}, fill = BLUE }: IconProps) {
  return (
    <svg
      style={{ width: '2rem', height: '2rem', ...style }}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <polygon points="20 9.26 2.91 9.26 11.29 1.08 10.24 0.01 0 10.01 10.24 20.01 11.29 18.94 2.91 10.76 20 10.76 20 9.26" />
    </svg>
  );
}
