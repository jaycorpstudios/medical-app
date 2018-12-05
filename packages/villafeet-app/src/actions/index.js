
import {
    PROCESS_LOGIN,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    PROCESS_LOGOUT,
    LOGOUT_SUCCESS,
    ADD_PATIENT,
    PATIENT_RECORD_IN_PROGRESS,
    PATIENT_RECORD_SUCCESS,
    PATIENT_RECORD_FAILED,
    PATIENT_RECORD_RESTORE
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

export function loginSuccess (userData) {
    return {
        type: LOGIN_SUCCESS,
        payload: { userData }
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
export function logoutSuccess () {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function addPatient (patient) {
    return {
        type: ADD_PATIENT,
        payload: { patient }
    }
}

export function patientRecordInProgress (status) {
    return {
        type: PATIENT_RECORD_IN_PROGRESS,
        payload: { status }
    }
}

export function patientRecordSuccess(){
    return {
        type: PATIENT_RECORD_SUCCESS
    }
}

export function patientRecordFailed(){
    return {
        type: PATIENT_RECORD_FAILED
    }
}
export function patientRecordRestore(){
    return {
        type: PATIENT_RECORD_RESTORE
    }
}