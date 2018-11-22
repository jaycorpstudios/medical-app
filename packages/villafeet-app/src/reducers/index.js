import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import browser from './ResponsiveStateReducer';
import patients from './patients';
import login from './login';

export const rootReducer = combineReducers({
    patients,
    browser,
    auth: login,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});
