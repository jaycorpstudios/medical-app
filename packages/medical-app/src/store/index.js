/* eslint-disable no-underscore-dangle */
/*
  global ENVIRONMENT
*/

import { createStore, compose, applyMiddleware } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import sagaMiddlewareCreator from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = sagaMiddlewareCreator();

const noDevTools = (noTools) => noTools;
const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const ReduxDevTools = reduxDevToolsExtension ? reduxDevToolsExtension() : noDevTools;
const devTools = ENVIRONMENT !== 'PROD' ? ReduxDevTools : noDevTools;

export default createStore(
  rootReducer,
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(sagaMiddleware),
    devTools,
  ),
);

sagaMiddleware.run(rootSaga);
