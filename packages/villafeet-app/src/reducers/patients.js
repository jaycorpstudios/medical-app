import {
    PATIENT_RECORD_IN_PROGRESS,
    PATIENT_RECORD_SUCCESS,
    PATIENT_RECORD_FAILED,
    PATIENT_RECORD_RESTORE
} from '../actions/types';

function patientRecordInProgress (state, inProgress) {
  return {...state, record: { ...state.record, inProgress } };
}

function patientRecordSuccess (state, succeded) {
  return {...state, record: { ...state.record, success: succeded, error: !succeded } };
}

function patientRecordRestore (state) {
  return {...state, record: { inProgress: false, success: false, error: false } };
}

const initialState = {
  record: {
    inProgress: false,
    success: false,
    error: false
  }
}
export default function PatientsReducer (state = initialState, action) {
  const {type, payload } = action;
  switch (action.type) {
    case PATIENT_RECORD_IN_PROGRESS:
        return patientRecordInProgress(state, action.payload.status);
    case PATIENT_RECORD_SUCCESS:
        return patientRecordSuccess(state, true);
    case PATIENT_RECORD_FAILED:
        return patientRecordSuccess(state, false);
    case PATIENT_RECORD_RESTORE:
        return patientRecordRestore(state);
    default:
      return state
  }
}
