import { all, call, put, takeLatest } from 'redux-saga/effects';
import dogLogger from '../features/common/logger';
import { authService } from './firebaseAuthService';
import dataService from './firebaseDataService';
import { packageCustomersSlice, packagesSlice, userSlice } from './reducer';

function* sagas() {
    yield all([
        loginFlow(),
        retrievePackagesFlow(),
        createPackageFlow(),
        updatePackageFlow(),
        deletePackageFlow(),
        retrievePackageCustomersFlow(),
        createPackageCustomersFlow(),
        updatePackageCustomersFlow(),
        deletePackageCustomersFlow(),
    ])

}
function* loginFlow() {
    yield takeLatest(userSlice.actions.fetch, loginSaga);
}

function* retrievePackagesFlow() {
    yield takeLatest(packagesSlice.actions.fetch, retrievePackagesSaga);
}
function* createPackageFlow() {
    yield takeLatest(packagesSlice.actions.create, createPackageSaga);
}
function* updatePackageFlow() {
    yield takeLatest(packagesSlice.actions.update, updatePackageSaga);
}
function* deletePackageFlow() {
    yield takeLatest(packagesSlice.actions.delete, deletePackageSaga);
}
function* retrievePackagesSaga(action: any) {
    try {
        const result = yield call(dataService.getRecordsShallow, action.payload);
        yield put(packagesSlice.actions.success(result));
    } catch (e) {
        yield put(packagesSlice.actions.fail(e.message));
        dogLogger.logger.error(`packageSaga: ${e.message} ${JSON.stringify(action.payload)}`);
    }
}
function* createPackageSaga(action: any) {
    try {
        const result = yield call(dataService.createRecord, action.payload);
        yield put(packagesSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packagesSlice.actions.fail(e.message));
    }
}
function* updatePackageSaga(action: any) {
    try {
        const result = yield call(dataService.updateRecord, action.payload);
        yield put(packagesSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packagesSlice.actions.fail(e.message));
    }
}
function* deletePackageSaga(action: any) {
    try {
        const result = yield call(dataService.deleteRecord, action.payload);
        yield put(packagesSlice.actions.success({...result, req: action.payload}));
    } catch (e) {
        yield put(packagesSlice.actions.fail(e.message));
    }
}
function* retrievePackageCustomersFlow() {
    yield takeLatest(packagesSlice.actions.fetch, retrievePackageCustomersSaga);
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




export default sagas;