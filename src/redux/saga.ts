import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authService } from './firebaseAuthService';
import  dataService  from './firebaseDataService';
import dogLogger from '../features/common/logger';

function* sagas() {
    yield all([
        loginFlow(),
        packagesFlow(),
        packageCustomersFlow(),
    ])

}

function* loginFlow() {
    yield takeLatest('LOGIN', loginSaga);
}

function* packagesFlow() {
    yield takeLatest('PACKAGES', packagesSaga);
}

function* packageCustomersFlow() {
    yield takeLatest('PACKAGECUSTOMERS', packageCustomersSaga);
}
function* loginSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        if (result.error) {
            yield put({ type: 'LOGIN_FAIL', payload: result.error.message });

        } else {

            yield put({ type: 'LOGIN_SUCCESS', payload: result });
        }

    } catch (e) {
        yield put({ type: 'LOGIN_FAIL', payload: e.message });
    }

}

function* packagesSaga(action: any) {
    try {
        const result = yield call(dataService.getRecordsShallow, action.payload);
        yield put({ type: 'PACKAGES_SUCCESS', payload: result });
    } catch (e) {
        yield put({ type: 'PACKAGES_FAIL', payload: e.message });
        dogLogger.logger.error(`packageSaga: ${e.message} ${JSON.stringify(action.payload)}`);
    }

}

function* packageCustomersSaga(action: any) {
    try {
        const result = yield call(dataService.getRecords, action.payload); 
        yield put({ type: 'PACKAGECUSTOMERS_SUCCESS', payload: result });

    } catch (e) {
        yield put({ type: 'PACKAGECUSTOMERS_FAIL', payload: e.message });
    }

}


export default sagas;