import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from './firebaseAuthService';
import {fork} from 'redux-saga/effects';

function* sagas() {
    yield takeLatest('LOGIN', loginSaga);

    // yield fork(loginFlow);
    // yield fork( packagesFlow);
    // yield fork(packageCustomersFlow);

}

// function* loginFlow() {
//     yield takeLatest('LOGIN', loginSaga);
// }

// function* packagesFlow() {
//     yield takeLatest('PACKAGES', packageSaga);
// }

// function* packageCustomersFlow() {
//     yield takeLatest('PACKAGECUSTOMERS', packageCustomersSaga);
// }
function* loginSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        console.log('----------------------ATTENTION----------', result);
        if (result.error) {
            yield put({ type: 'LOGIN_FAIL', payload: result.error.message });

        } else {

            yield put({ type: 'LOGIN_SUCCESS', payload: result });
        }

    } catch (e) {
        yield put({ type: 'LOGIN_FAIL', payload: e.message });
    }

}

// function* packageSaga(action: any) {
//     try {
//         const result = yield call(authService.login, action.payload);
//         yield put({ type: 'LOGIN_SUCCESS', payload: result });

//     } catch (e) {
//         yield put({ type: 'LOGIN_FAIL', payload: e.message });
//     }

// }

// function* packageCustomersSaga(action: any) {
//     try {
//         const result = yield call(authService.login, action.payload);
//         yield put({ type: 'LOGIN_SUCCESS', payload: result });

//     } catch (e) {
//         yield put({ type: 'LOGIN_FAIL', payload: e.message });
//     }

// }


export default sagas;