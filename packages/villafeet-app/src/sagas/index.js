//TODO: Split sagas by type
import 'regenerator-runtime/runtime';
import { PROCESS_LOGIN, ADD_PATIENT, USER_GET } from './../actions/types';
import {
        loginInProgress, loginSuccess, loginFailed, logout,
        userInProgress, userDataSuccess,
        patientRecordInProgress, patientRecordSuccess, patientRecordFailed
} from './../actions';
import { put, takeEvery } from 'redux-saga/effects';

import ApiService from './../services/ApiService';

//TODO: Remove firebase dependency once login and patient actions are migrated to rest API
import firebase from './../firebase';

function extractJwtFromAuthHeader(token = '') {
    return token.replace(/Bearer /,'');
};

export function * loginSaga ({ payload:{credentials} }) {
    yield put(loginInProgress(true));
    try {
        const options = { body: {...credentials} }
        const response = yield ApiService.post({endpoint: 'auth/login', options});
        if(response.success){
            const { token } = response;
            const parsedToken = extractJwtFromAuthHeader(token);
            yield put(loginSuccess(parsedToken));
        } else {
            const { message = 'Error en proceso de Login' } = response;
            yield put(loginFailed({ message }));
        }
        yield put(loginInProgress(false));
    } catch(error) {
        const { message='Error durante el proceso de Login' } = error;
        yield put(loginFailed({ message }));
        yield put(loginInProgress(false));
    }
}

function * getUserDataSaga () {
    yield put(userInProgress(true));
    try {
        const response = yield ApiService.get({endpoint: 'auth/me'});
        if(response.unauthorized){
            yield put(logout());
        } else {
            yield put(userDataSuccess(response));
            yield put(userInProgress(false));
        }        
    } catch(error) {
        //TODO: set user error flag and properly log error.
        yield put(userInProgress(false));
    }
}

export function * addPatientSaga ({ payload:{patient} }) {
    yield put(patientRecordInProgress(true));
    try {
        const collection = firebase.firestore().collection('pacientes');
        const response = yield collection.add(patient);
        yield put(patientRecordSuccess());
    } catch(error) {
        yield put(patientRecordFailed());
        console.error('Error on adding patient record');
    }
    yield put(patientRecordInProgress(false));
}

export default function * rootSaga () {
  yield takeEvery(PROCESS_LOGIN, loginSaga);
  yield takeEvery(USER_GET, getUserDataSaga);
  yield takeEvery(ADD_PATIENT, addPatientSaga);
}
