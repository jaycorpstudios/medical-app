import { createResponsiveStateReducer } from 'redux-responsive';

const customMaxBreakpoints = {
  extraSmall: 480,
  small: 767,
  medium: 991,
  large: 1199,
};

const browser = createResponsiveStateReducer(customMaxBreakpoints);

export default browser;
