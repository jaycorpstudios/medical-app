import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_IN_PROGRESS,
    LOGOUT_SUCCESS
} from '../actions/types';
import cacheHelper from './../utils/cache';

export function authInProgress (state, inProgress) {
    return { ...state, inProgress };
}

export function authError (state, error) {
    const { message } = error;
    return { ...state, error: { message } };
}

export function setAuth (state, user) {
    cacheHelper.setItem('auth', {authenticated: true, uid: user.uid });
    return {...state, authenticated: true, uid: user.uid };
}
export function removeAuth (state) {
    cacheHelper.setItem('auth', null);
    return {...state, authenticated: false, uid: null };
}

const initialState = {
    authenticated: false,
    inProgress: false,
    user: {},
    error: {}
}
export default function LoginReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
        return authInProgress(state, action.payload.status);
    case LOGIN_SUCCESS:
        return setAuth(state, action.payload.userData);
    case LOGIN_FAILED:
        return authError(state, action.payload.error);
    case LOGOUT_SUCCESS:
        return removeAuth(state);
    default:
      return state
  }
}
