import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from './firebaseAuthService';

function* sagas() {
    yield takeLatest('LOGIN', loginSaga);
      yield takeLatest('PACKAGES', packageSaga);
        yield takeLatest('PACKAGECUSTOMERS', packageCustomersSaga);

}

function* loginSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        yield put({ type: 'LOGIN_SUCCESS', payload: result });

    } catch (e) {
        yield put({ type: 'LOGIN_FAIL', payload: e.message });
    }

}

function* packageSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        yield put({ type: 'LOGIN_SUCCESS', payload: result });

    } catch (e) {
        yield put({ type: 'LOGIN_FAIL', payload: e.message });
    }

}

function* packageCustomersSaga(action: any) {
  try {
      const result = yield call(authService.login, action.payload);
      yield put({ type: 'LOGIN_SUCCESS', payload: result });

  } catch (e) {
      yield put({ type: 'LOGIN_FAIL', payload: e.message });
  }

}


export default sagas;