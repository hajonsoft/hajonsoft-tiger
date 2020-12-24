import { all, call, put, takeLatest } from 'redux-saga/effects';
import travellerService from '../features/Dashboard/redux/travellerService';
import { authService } from './firebaseAuthService';
import dataService from './firebaseDataService';
import { travellerSlice, userSlice } from './reducer';

function* sagas() {
    yield all([
        loginFlow(),
        retrieveTravellersFlow(),
        createPackageFlow(),
        updatePackageFlow(),
        deletePackageFlow(),
    ])

}
function* loginFlow() {
    yield takeLatest(userSlice.actions.fetch, loginSaga);
}

function* retrieveTravellersFlow() {
    yield takeLatest(travellerSlice.actions.fetch, retrieveTravellersSaga);
}
function* createPackageFlow() {
    yield takeLatest(travellerSlice.actions.create, createPackageSaga);
}
function* updatePackageFlow() {
    yield takeLatest(travellerSlice.actions.update, updatePackageSaga);
}
function* deletePackageFlow() {
    yield takeLatest(travellerSlice.actions.delete, deletePackageSaga);
}
function* retrieveTravellersSaga(action) {
    try {
        const result = yield call(travellerService.getTravellers, action.payload);
        yield put(travellerSlice.actions.success(result));
    } catch (e) {
        yield put(travellerSlice.actions.fail(e.message));
    }
}
function* createPackageSaga(action) {
    try {
        const result = yield call(dataService.createRecord, action.payload);
        yield put(travellerSlice.actions.success({ ...result, req: action.payload }));
    } catch (e) {
        yield put(travellerSlice.actions.fail(e.message));
    }
}
function* updatePackageSaga(action) {
    try {
        const result = yield call(dataService.updateRecord, action.payload);
        yield put(travellerSlice.actions.success({ ...result, req: action.payload }));
    } catch (e) {
        yield put(travellerSlice.actions.fail(e.message));
    }
}
function* deletePackageSaga(action) {
    try {
        const result = yield call(dataService.deleteRecord, action.payload);
        yield put(travellerSlice.actions.success({ ...result, req: action.payload }));
    } catch (e) {
        yield put(travellerSlice.actions.fail(e.message));
    }
}

function* loginSaga(action) {
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