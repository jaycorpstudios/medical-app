import {
  BLUR_APP_BACKGROUND,
  FOCUS_APP_BACKGROUND,
} from '../actions/types';


const blurApp = (state) => ({ ...state, blur: true });
const focusApp = (state) => ({ ...state, blur: false });

const mapActionReducers = {
  [BLUR_APP_BACKGROUND]: blurApp,
  [FOCUS_APP_BACKGROUND]: focusApp,
};

const initialState = {
  blur: false,
};

export default function appReducer(state = initialState, action = {}) {
  const { type } = action;
  const reducer = mapActionReducers[type];
  return reducer ? reducer(state, action) : state;
}
