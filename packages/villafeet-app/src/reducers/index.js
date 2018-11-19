import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import browser from './ResponsiveStateReducer';
import patients from './patients';

export const rootReducer = combineReducers({
    patients,
    browser,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});
