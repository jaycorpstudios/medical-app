import 'regenerator-runtime/runtime';
import { fork } from 'redux-saga/effects';
import rootLoginSaga from './loginSaga'
import rootUserSaga from './userSaga'
import rootPatientsSaga from './patientsSaga'

export default function * rootSaga () {
  yield [
      fork(rootLoginSaga),
      fork(rootUserSaga),
      fork(rootPatientsSaga),
  ]
}
