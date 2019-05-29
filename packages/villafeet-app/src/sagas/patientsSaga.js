import 'regenerator-runtime/runtime';
import {
    ADD_PATIENT, FETCH_PATIENTS, FETCH_PATIENT,
    FETCH_KEY_LIST_PATIENTS,
    FETCH_KEY_ADD_PATIENT,
    FETCH_KEY_GET_PATIENT
} from '../actions/types';
import {
    fetchInProgress, fetchError, fetchSuccess,
    setPatients, setPatient, setNewPatient
} from '../actions';
import { put, takeEvery } from 'redux-saga/effects';

import ApiService from '../services/ApiService';

export function * addPatientSaga ({ payload:{patient} }) {
    yield put(fetchInProgress(FETCH_KEY_ADD_PATIENT));
    try {
        const newPatient = yield ApiService.post({endpoint: 'patients', options: {body: patient} });
        yield put(setNewPatient(newPatient))
        yield put(fetchSuccess(FETCH_KEY_ADD_PATIENT));
    } catch(error) {
        console.error(error)
        const { status = 0, message = 'Error' } = error;
        yield put(fetchError(FETCH_KEY_ADD_PATIENT, message ));
    }
}

export function * listPatientsSaga () {
    yield put(fetchInProgress(FETCH_KEY_LIST_PATIENTS));
    try {
        const response = yield ApiService.get({ endpoint: 'patients' });
        yield put(setPatients(response))
        yield put(fetchSuccess(FETCH_KEY_LIST_PATIENTS));
    } catch(error) {
        yield put(fetchError(FETCH_KEY_LIST_PATIENTS, error));
    }
}

export function * getPatientSaga ({ patientId = '' }) {
    yield put(fetchInProgress(FETCH_KEY_GET_PATIENT));
    try {
        const patient = yield ApiService.get({endpoint: `patients/${patientId}` });
        yield put(setPatient(patient))
        yield put(fetchSuccess(FETCH_KEY_GET_PATIENT));
    } catch(error) {
        yield put(fetchError(FETCH_KEY_GET_PATIENT, error ));
    }
}

export default function * rootPatientsSaga () {
  yield takeEvery(ADD_PATIENT, addPatientSaga)
  yield takeEvery(FETCH_PATIENTS, listPatientsSaga)
  yield takeEvery(FETCH_PATIENT, getPatientSaga)
}
