import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from './services';

function* sagas() {
    yield takeLatest('LOGIN', loginSaga);

}

function* loginSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        yield put({ type: 'LOGIN_SUCCESS', payload: result });

    } catch (e) {
        yield put({ type: 'LOGIN_ERROR', message: e.message });
    }

}

export default sagas;