import { combineReducers } from 'redux'

import fetchReducer from '../fetch'
import HighOrderReducer from '../highOrderReducer'
import {
  FETCH_KEY_LIST_PATIENTS,
  SET_PATIENTS
} from '../../actions/types'

const statusInitialState = {
  inProgress: false,
  success: false,
  error: false,
  errorMessage: null
}

const listInitialState = {
  meta: {},
  patients: []
}

const meta = { initialState: statusInitialState, key: FETCH_KEY_LIST_PATIENTS }
const statusReducer = HighOrderReducer(meta, fetchReducer)

function setPatients(state, meta, patients){
  return { ...state, meta, patients }
}

function patientsReducer (state = listInitialState, action) {
  const { type = '', payload = {} } = action;
  switch (type) {
    case SET_PATIENTS:
        return setPatients(state, payload.meta, payload.patients);
    default:
      return state
  }
}

const patientListReducer = combineReducers({
  status: statusReducer,
  data: patientsReducer
});

export default patientListReducer;