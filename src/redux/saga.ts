import { all, call, put, takeLatest } from 'redux-saga/effects';
import dogLogger from '../features/common/logger';
import { authService } from './firebaseAuthService';
import dataService from './firebaseDataService';
import { packageCustomersSlice, packagesSlice, userSlice } from './reducer';

function* sagas() {
    yield all([
        loginFlow(),
        packagesFlow(),
        packageCustomersFlow(),
    ])

}
function* loginFlow() {
    yield takeLatest(userSlice.actions.fetch, loginSaga);
}

function* packagesFlow() {
    yield takeLatest(packagesSlice.actions.fetch, packagesSaga);
}

function* packageCustomersFlow() {
    yield takeLatest(packageCustomersSlice.actions.fetch, packageCustomersSaga);
}
function* loginSaga(action: any) {
    try {
        const result = yield call(authService.login, action.payload);
        if (result.error) {
            yield put(userSlice.actions.fail(result));
        } else {
            yield put(userSlice.actions.success(result));
        }
    } catch (e) {
        yield put(userSlice.actions.fail(e.message));
    }
}

// TODO: implement caching here so you do not go back to the database as long as the data is available in store.
function* packagesSaga(action: any) {
    try {
        const result = yield call(dataService.getRecordsShallow, action.payload);
        yield put(packagesSlice.actions.success(result));
    } catch (e) {
        yield put(packagesSlice.actions.fail(e.message));
        dogLogger.logger.error(`packageSaga: ${e.message} ${JSON.stringify(action.payload)}`);
    }
}

function* packageCustomersSaga(action: any) {
    try {
        const result = yield call(dataService.getRecords, action.payload);
        yield put(packageCustomersSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packageCustomersSlice.actions.fail(e.message));
    }
}


export default sagas;