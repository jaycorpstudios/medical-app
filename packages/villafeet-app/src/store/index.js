/*
  global ENVIRONMENT
*/

import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import {responsiveStoreEnhancer} from 'redux-responsive';
import firebase from './../firebase';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import sagaMiddlewareCreator from 'redux-saga';
import rootSaga from './../sagas';

const sagaMiddleware = sagaMiddlewareCreator();

const reactReduxFirebaseConfig = {
  userProfile: 'usuarios',
  enableLogging: false,
  useFirestoreForProfile: true,
  attachAuthIsReady: true
}

const noDevTools = noTools => noTools;
const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noDevTools;
const devTools = ENVIRONMENT !== 'PROD' ? ReduxDevTools : noDevTools;

export default createStore(
  rootReducer,
  compose(
    responsiveStoreEnhancer,
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, reactReduxFirebaseConfig),
    applyMiddleware(sagaMiddleware),
    devTools
  )
);

sagaMiddleware.run(rootSaga);