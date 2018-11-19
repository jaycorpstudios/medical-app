import { createStore, compose } from 'redux';
import { rootReducer } from '../reducers';
import {responsiveStoreEnhancer} from 'redux-responsive';
import firebase from './../firebase';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase } from 'react-redux-firebase';

const reactReduxFirebaseConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false
}

export default createStore(
  rootReducer,
  compose(
    responsiveStoreEnhancer,
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, reactReduxFirebaseConfig),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
