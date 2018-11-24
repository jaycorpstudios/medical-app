import 'regenerator-runtime/runtime';
import { PROCESS_LOGIN, PROCESS_LOGOUT } from './../actions/types';
import { loginInProgress, loginSuccess, loginFailed, logoutSuccess } from './../actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from './../firebase';

export function * loginOnFirebaseSaga ({ payload:{credentials} }) {
    yield put(loginInProgress(true));
    try {
        const response = yield call(firebase.login, credentials);
        const {user:{user}} = response;
        yield put(loginSuccess(user));
        yield put(loginInProgress(false));
    } catch(error) {
        yield put(loginFailed({message: 'Usuario o password incorrecto'}));
        yield put(loginInProgress(false));
    }
}

export function * logoutFirebaseSaga () {
    try {
        yield call(firebase.logout);
        yield put(logoutSuccess());
    } catch(error) {
        console.error('Error on logout');
    }
}

export default function * rootSaga () {
  yield takeEvery(PROCESS_LOGIN, loginOnFirebaseSaga);
  yield takeEvery(PROCESS_LOGOUT, logoutFirebaseSaga);
}
