import { all, call, put, takeLatest } from 'redux-saga/effects';
import dogLogger from '../features/common/logger';
import { authService } from './firebaseAuthService';
import dataService from './firebaseDataService';
import { packageCustomersSlice, packagesSlice, userSlice } from './reducer';

function* sagas() {
    yield all([
        loginFlow(),
        packagesFlow(),
        retrievePackageCustomersFlow(),
        createPackageCustomersFlow(),
        updatePackageCustomersFlow(),
        deletePackageCustomersFlow(),
    ])

}
function* loginFlow() {
    yield takeLatest(userSlice.actions.fetch, loginSaga);
}

function* packagesFlow() {
    yield takeLatest(packagesSlice.actions.fetch, packagesSaga);
}

function* retrievePackageCustomersFlow() {
    yield takeLatest(packageCustomersSlice.actions.fetch, retrievePackageCustomersSaga);
}
function* createPackageCustomersFlow() {
    yield takeLatest(packageCustomersSlice.actions.create, createPackageCustomersSaga);
}
function* updatePackageCustomersFlow() {
    yield takeLatest(packageCustomersSlice.actions.update, updatePackageCustomersSaga);
}
function* deletePackageCustomersFlow() {
    yield takeLatest(packageCustomersSlice.actions.delete, deletePackageCustomersSaga);
}
function* retrievePackageCustomersSaga(action: any) {
    try {
        const result = yield call(dataService.getRecords, action.payload);
        yield put(packageCustomersSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packageCustomersSlice.actions.fail(e.message));
    }
}
function* createPackageCustomersSaga(action: any) {
    try {
        const result = yield call(dataService.createRecord, action.payload);
        yield put(packageCustomersSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packageCustomersSlice.actions.fail(e.message));
    }
}
function* updatePackageCustomersSaga(action: any) {
    try {
        const result = yield call(dataService.updateRecord, action.payload);
        yield put(packageCustomersSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packageCustomersSlice.actions.fail(e.message));
    }
}
function* deletePackageCustomersSaga(action: any) {
    try {
        const result = yield call(dataService.deleteRecord, action.payload);
        yield put(packageCustomersSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packageCustomersSlice.actions.fail(e.message));
    }
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


export default sagas;