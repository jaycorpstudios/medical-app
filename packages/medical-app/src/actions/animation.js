import {
  BLUR_APP_BACKGROUND,
  FOCUS_APP_BACKGROUND,
} from './types';

function blurAppBackground(active = false) {
  const blurApp = {
    type: BLUR_APP_BACKGROUND,
  };
  const focusApp = {
    type: FOCUS_APP_BACKGROUND,
  };
  return active ? blurApp : focusApp;
}

export default blurAppBackground;
