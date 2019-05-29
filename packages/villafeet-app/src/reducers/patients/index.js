import { combineReducers } from 'redux'
import newRecordReducer from './newRecordReducer';
import patientListReducer from './patientListReducer';
import patientDetailReducer from './patientDetailReducer';

const PatientsReducer = combineReducers({
  newRecord: newRecordReducer,
  list: patientListReducer,
  detail: patientDetailReducer
})

export default PatientsReducer;
