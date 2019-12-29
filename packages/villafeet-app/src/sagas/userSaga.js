import 'regenerator-runtime/runtime';
import { put, takeEvery } from 'redux-saga/effects';
import { USER_GET } from '../actions/types';
import {
  logout,
  userInProgress, userDataSuccess,
} from '../actions';

import ApiService from '../services/ApiService';

// TODO: update using fetchInProgress, fetchError, fetchSuccess

function* getUserDataSaga() {
  yield put(userInProgress(true));
  try {
    const response = yield ApiService.get({ endpoint: 'auth/me' });
    if (response.unauthorized) {
      yield put(logout());
    } else {
      yield put(userDataSuccess(response));
      yield put(userInProgress(false));
    }
  } catch (error) {
    // TODO: set user error flag and properly log error.
    yield put(userInProgress(false));
  }
}

export default function* rootUserSaga() {
  yield takeEvery(USER_GET, getUserDataSaga);
}
