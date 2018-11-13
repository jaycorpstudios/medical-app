import { createStore, compose } from 'redux';
import { rootReducer } from '../reducers';
import {responsiveStoreEnhancer} from 'redux-responsive'

export default createStore(
  rootReducer,
  compose(
    responsiveStoreEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
