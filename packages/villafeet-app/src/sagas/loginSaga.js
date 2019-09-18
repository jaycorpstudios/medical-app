//TODO: Split sagas by type
import 'regenerator-runtime/runtime';
import { PROCESS_LOGIN } from './../actions/types';
import {
    loginInProgress,
    loginSuccess,
    loginFailed,
} from './../actions';
import { put, takeEvery } from 'redux-saga/effects';
import ApiService from './../services/ApiService';
import AlertService from './../services/AlertService';

function extractJwtFromAuthHeader(token = '') {
    return token.replace(/Bearer /,'');
};

//TODO: update using fetchInProgress, fetchError, fetchSuccess

export function * loginSaga ({ payload:{credentials} }) {
    yield put(loginInProgress(true));
    try {
        const options = { body: {...credentials} }
        const response = yield ApiService.post({endpoint: 'auth/login', options});
        if(response.success){
            const { token } = response;
            const parsedToken = extractJwtFromAuthHeader(token);
            AlertService.triggerAlert({
                id: 'login',
                type: 'success',
                highlight:'😛',
                text: 'Bienvenid@'
            })
            yield put(loginSuccess(parsedToken));
        } else {
            const { message = 'Error en proceso de Login' } = response;
            AlertService.triggerAlert({
                id: 'login',
                type: 'error',
                highlight:'🥺',
                text: 'Usuario o password incorrecto'
            })
            yield put(loginFailed({ message }));
        }
        yield put(loginInProgress(false));
    } catch(error) {
        const { message='Error durante el proceso de Login' } = error;
        yield put(loginFailed({ message }));
        AlertService.triggerAlert({ id: 'login', type: 'error', highlight:'Ups!', text: 'Error en proceso de Login' })
        yield put(loginInProgress(false));
    }
}

export default function * rootLoginSaga () {
  yield takeEvery(PROCESS_LOGIN, loginSaga);
}
