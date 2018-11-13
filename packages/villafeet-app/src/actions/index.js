
import {
    GET_PATIENTS
  } from './types'

export function getPatients () {
    return {
        type: GET_PATIENTS,
        payload: { }
    }
}

