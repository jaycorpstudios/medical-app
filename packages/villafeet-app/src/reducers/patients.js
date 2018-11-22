
export function getPatients (state, action) {
  return state;
}

export default function PatientsReducer (state = [], action) {
  switch (action.type) {
    case 'ADD_PATIENT':
      return state;
    default:
      return state
  }
}
