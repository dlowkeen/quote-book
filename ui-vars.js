// branding colors
const colorVars = {
  colorTypeDark: 'rgb(63,65,67)',
  colorTypeLight: 'rgb(240,240,240)',

  // currency brand colors
  colorCurrencyNavy: '#003b5c',
  colorCurrencyWhite: 'white',
  colorCurrencyGold: '#b3a369',
  colorCurrencyRed: '#e1523c',
  colorCurrencyGreen: '#06ad4b',
  colorCurrencyBlue: '#0091c8',

  // TODO -- are all these used?
  colorGrey0: 'rgb(235,235,235)',
  colorGrey1: 'rgb(175,180,190)',
  colorGrey2: 'rgb(153, 153, 153)',
  colorGrey3: 'rgb(107,107,107)',

  // TODO -- use currency colors?
  colorSuccess: 'rgb(34,176,96)',
  colorError: 'rgb(230,0,55)',
};

const uiVars = {
  uiBoxShadowDark: '1px 1px 4px 1px rgba(0,0,0,0.3)',
  uiBoxShadowLight: '1px 1px 4px 1px rgba(255,255,255,0.3)',
  uiBorderRadius: '3px',
};

// RWD breakpoints
// these will be treaded as pixel values in CSS
const breakpointVars = {
  bpPhablet: 780,
  bpDesk: 1100,
  bpXl: 2500,
};

// typography settings
const typographyVars = {
  baseFont: `"canada-type-gibson", "Helvetica Neue", courier, sans-serif`,
  headerFont: `"canada-type-gibson", "Helvetica Neue", courier, sans-serif`,
  base1: 1.7,
  ratio1: 1.25,
  base2: 1.9,
  ratio2: 1.25,
};

module.exports = Object.assign(
  {},
  colorVars,
  uiVars,
  breakpointVars,
  typographyVars,
);
