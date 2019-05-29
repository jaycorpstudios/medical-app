import { combineReducers } from 'redux';
import browser from './ResponsiveStateReducer';
import patients from './patients/';
import user from './user';
import login from './login';

export const rootReducer = combineReducers({
    patients,
    user,
    browser,
    auth: login,
});
