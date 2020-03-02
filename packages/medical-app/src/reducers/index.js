import { combineReducers } from 'redux';
import app from './appReducer';
import browser from './ResponsiveStateReducer';
import patients from './patients';
import user from './user';
import login from './login';

const rootReducer = combineReducers({
  app,
  patients,
  user,
  browser,
  auth: login,
});

export default rootReducer;
