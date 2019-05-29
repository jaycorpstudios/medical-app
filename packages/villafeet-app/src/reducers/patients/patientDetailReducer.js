import { combineReducers } from 'redux'

import fetchReducer from '../fetch'
import HighOrderReducer from '../highOrderReducer'
import {
  FETCH_KEY_GET_PATIENT,
  SET_PATIENT
} from '../../actions/types'

const statusInitialState = {
  inProgress: false,
  success: false,
  error: false,
  errorMessage: null
}

const meta = { initialState: statusInitialState, key: FETCH_KEY_GET_PATIENT }
const statusReducer = HighOrderReducer(meta, fetchReducer)

function setPatient(patient){
  return { ...patient }
}

function patientReducer (state = {}, action) {
  const { type = '', patient = {} } = action;
  switch (type) {
    case SET_PATIENT:
        return setPatient(patient);
    default:
      return state
  }
}

const patientDetailReducer = combineReducers({
  status: statusReducer,
  data: patientReducer
});

export default patientDetailReducer;