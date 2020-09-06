import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.618,
  googleFonts: [
    {
      name: 'Noto Sans KR',
      styles: ['300', '400', '500', '700']
    },
    {
      name: 'Nanum Gothic KR',
      styles: ['400', '700']
    }
  ],
  headerFontFamily: ['Noto Sans KR', 'sans-serif'],
  bodyFontFamily: ['Nanum Gothic', 'sans-serif'],
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
