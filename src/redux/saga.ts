import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from './firebaseAuthService';

function* sagas() {
    yield takeLatest('LOGIN', loginSaga);

}

function* loginSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        yield put({ type: 'LOGIN_SUCCESS', payload: result });

    } catch (e) {
        yield put({ type: 'LOGIN_FAIL', payload: e.message });
    }

}

export default sagas;