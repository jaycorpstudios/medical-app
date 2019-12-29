import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_IN_PROGRESS,
  PROCESS_LOGOUT,
} from '../actions/types';
import cacheHelper from '../utils/cache';

function authInProgress(state, inProgress) {
  return { ...state, inProgress };
}

function authError(state, error) {
  const { message } = error;
  return { ...state, error: { message } };
}

function setAuth(state, token) {
  cacheHelper.setItem('auth', { token, authenticated: true });
  return { ...state, authenticated: true };
}
function removeAuth(state) {
  cacheHelper.setItem('auth', null);
  return { ...state, authenticated: false };
}

const auth = cacheHelper.getItem('auth');
const isAuthenticated = auth && auth.authenticated ? auth.authenticated : false;

const initialState = {
  authenticated: isAuthenticated,
  inProgress: false,
  error: {},
};
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      return authInProgress(state, action.payload.status);
    case LOGIN_SUCCESS: {
      const { token } = action.payload;
      return setAuth(state, token);
    }
    case LOGIN_FAILED:
      return authError(state, action.payload.error);
    case PROCESS_LOGOUT:
      return removeAuth(state);
    default:
      return state;
  }
}
