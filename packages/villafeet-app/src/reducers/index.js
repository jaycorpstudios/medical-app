import { combineReducers } from 'redux';
import browser from './ResponsiveStateReducer';
import patients from './patients';

export const rootReducer = combineReducers({
    patients,
    browser
});
