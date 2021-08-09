import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createSystemsFlow,
  deleteSystemsFlow,
  retrieveSystemsFlow,
  updateSystemsFlow
} from "../features/Dashboard/redux/saga";
import travellerService from "../features/Dashboard/redux/travellerService";
import { authService } from "./firebaseAuthService";
import { travellerSlice, userSlice } from "./reducer";

//reducer from src\redux\reducer.js ^p
function* sagas() {
  yield all([
    loginFlow(),
    retrieveSystemsFlow(),
    createSystemsFlow(),
    updateSystemsFlow(),
    deleteSystemsFlow(),
    retrieveCaravanFlow(),
    createCaravanFlow(),
    updateCaravanFlow(),
    deleteCaravanFlow(),
  ]);
}

function* retrieveCaravanFlow() {
  yield takeLatest(travellerSlice.actions.fetch, retrieveCaravanSaga);
}
function* createCaravanFlow() {
  yield takeLatest(travellerSlice.actions.create, createCaravanSaga);
}
function* updateCaravanFlow() {
  yield takeLatest(travellerSlice.actions.update, updateCaravanSaga);
}
function* deleteCaravanFlow() {
  yield takeLatest(travellerSlice.actions.delete, deleteCaravanSaga);
}

function* retrieveCaravanSaga(action) {
  try {
    const result = yield call(travellerService.getTravellers, action.payload);
    yield put(travellerSlice.actions.fetchSuccess(result));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* createCaravanSaga(action) {
  try {
    const result = yield call(travellerService.createTraveller, action.payload);
    yield put(travellerSlice.actions.createSuccess({ ...result }));
    yield put(travellerSlice.actions.fetch({ path: '/customer' }));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* updateCaravanSaga(action) {
  try {
    yield call(travellerSlice.updateTraveller, action.payload);
    yield put(travellerSlice.actions.updateSuccess(action.payload));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* deleteCaravanSaga(action) {
  try {
    yield call(travellerService.deleteTraveller, action.payload);
    yield put(travellerSlice.actions.deleteSuccess(action.payload));
    yield put(travellerSlice.actions.fetch({path: '/customer'}));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}

function* loginFlow() {
  yield takeLatest(userSlice.actions.fetch, loginSaga);
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
