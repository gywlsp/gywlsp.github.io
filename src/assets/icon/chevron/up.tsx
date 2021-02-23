import React from 'react';

import { BLACK } from 'src/constants/colors';
import { IconProps } from '../icons';

export default function ChevronUpIcon({ style = {}, fill = BLACK }: IconProps) {
  return (
    <svg
      style={{ width: '1.2rem', height: '1.2rem', ...style }}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <polygon points="18.94 15.39 10 6.23 1.06 15.39 -0.01 14.34 10 4.08 20.01 14.34 18.94 15.39" />
    </svg>
  );
}
