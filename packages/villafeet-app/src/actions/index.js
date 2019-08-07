
import {
    PROCESS_LOGIN,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    PROCESS_LOGOUT,
    USER_GET,
    USER_IN_PROGRESS,
    USER_SUCCESS,
    ADD_PATIENT,
    DELETE_PATIENT,
    SET_NEW_PATIENT,
    FETCH_PATIENTS,
    SET_PATIENTS,
    FETCH_PATIENT,
    SET_PATIENT
  } from './types'

export function processLogin (credentials) {
    return {
        type: PROCESS_LOGIN,
        payload: { credentials }
    }
}

export function loginInProgress (status) {
    return {
        type: LOGIN_IN_PROGRESS,
        payload: { status }
    }
}

export function loginSuccess (token) {
    return {
        type: LOGIN_SUCCESS,
        payload: { token }
    }
}

export function loginFailed (error) {
    return {
        type: LOGIN_FAILED,
        payload: { error }
    }
}

export function logout () {
    return {
        type: PROCESS_LOGOUT
    }
}

export function getUserData() {
    return {
        type: USER_GET
    }
}
export function userInProgress(status) {
    return {
        type: USER_IN_PROGRESS,
        payload: { status }
    }
}
export function userDataSuccess(userData) {
    return {
        type: USER_SUCCESS,
        payload: { userData }
    }
}

export function addPatient (patient) {
    return {
        type: ADD_PATIENT,
        payload: { patient }
    }
}

export function setNewPatient (patient) {
    return {
        type: SET_NEW_PATIENT,
        patient
    }
}

export function fetchPatients () {
    return {
        type: FETCH_PATIENTS
    }
}

export function setPatients (payload) {
    return {
        type: SET_PATIENTS,
        payload
    }
}

export function fetchPatient (patientId) {
    return {
        type: FETCH_PATIENT,
        patientId
    }
}

export function removePatient (patientId) {
    return {
        type: DELETE_PATIENT,
        patientId
    }
}

export function setPatient (patient) {
    return {
        type: SET_PATIENT,
        patient
    }
}

export * from './fetch'