import { GET_PATIENTS } from '../actions/types';

export function getPatients (state, action) {
  return state;
}

export default function PatientsReducer (state = [], action) {
  switch (action.type) {
    case GET_PATIENTS:
      return getPatients(state);
    case 'ADD_PATIENT':
      return state;
    default:
      return state
  }
}
