import { combineReducers } from 'redux';

import fetchReducer from '../fetch';
import HighOrderReducer from '../highOrderReducer';
import { FETCH_KEY_ADD_PATIENT, SET_NEW_PATIENT } from '../../actions/types';

const initialState = {
  inProgress: false,
  success: false,
  error: false,
  errorMessage: null,
};

const meta = { initialState, key: FETCH_KEY_ADD_PATIENT };
const statusReducer = HighOrderReducer(meta, fetchReducer);

function setNewPatient(patient) {
  return { ...patient };
}

function newRecordReducer(state = {}, action) {
  const { type = '', patient = {} } = action;
  switch (type) {
    case SET_NEW_PATIENT:
      return setNewPatient(patient);
    default:
      return state;
  }
}

export default combineReducers({
  status: statusReducer,
  data: newRecordReducer,
});
