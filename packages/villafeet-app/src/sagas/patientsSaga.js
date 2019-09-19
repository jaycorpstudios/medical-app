import 'regenerator-runtime/runtime';
import AlertService from './../services/AlertService';
import {
    ADD_PATIENT, FETCH_PATIENTS, FETCH_PATIENT, DELETE_PATIENT,
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
        const { _id : patientId = null } = patient;
        if(patientId){
            patient = yield ApiService.put({endpoint: `patients/${patientId}`, options: {body: patient} });
        } else {
            patient = yield ApiService.post({endpoint: 'patients', options: {body: patient} });
        }
        yield put(setNewPatient(patient))
        yield put(fetchSuccess(FETCH_KEY_ADD_PATIENT));
        AlertService.triggerAlert({
            id: 'process-patient',
            type:'success',
            highlight: patientId ? 'Listo!' : 'Celebremos!',
            text: patientId ? 'registro de paciente actualizado' : `hemos agregado a ${patient.name} como tu paciente`
        })
    } catch(error) {
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

export function * deletePatientSaga ({ patientId = '' }) {
    yield put(fetchInProgress(FETCH_KEY_GET_PATIENT));
    try {
        const patient = yield ApiService.delete({endpoint: `patients/${patientId}` });
        yield put(setPatient(patient))
        yield put(fetchSuccess(FETCH_KEY_GET_PATIENT));
        AlertService.triggerAlert({
            id: 'patient-delete',
            type: 'warning',
            highlight:'Ok',
            text: `${patient.name} ya no es tu paciente`
        })
    } catch(error) {
        yield put(fetchError(FETCH_KEY_GET_PATIENT, error ));
        AlertService.triggerAlert({
            id: 'patient-delete',
            type: 'error',
            highlight:'Oh no!',
            text: 'no pudimos eliminar el paciente'
        })
    }
}

export default function * rootPatientsSaga () {
  yield takeEvery(ADD_PATIENT, addPatientSaga)
  yield takeEvery(DELETE_PATIENT, deletePatientSaga)
  yield takeEvery(FETCH_PATIENTS, listPatientsSaga)
  yield takeEvery(FETCH_PATIENT, getPatientSaga)
}
