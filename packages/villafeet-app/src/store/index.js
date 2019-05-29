/*
  global ENVIRONMENT
*/

import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import {responsiveStoreEnhancer} from 'redux-responsive';
import sagaMiddlewareCreator from 'redux-saga';
import rootSaga from './../sagas';

const sagaMiddleware = sagaMiddlewareCreator();

const noDevTools = noTools => noTools;
const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noDevTools;
const devTools = ENVIRONMENT !== 'PROD' ? ReduxDevTools : noDevTools;

export default createStore(
  rootReducer,
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(sagaMiddleware),
    devTools
  )
);

sagaMiddleware.run(rootSaga);