import { call, put, takeLatest } from "redux-saga/effects";
import { systemSlice, travellerSlice } from "../../../redux/reducer";
import travellerService from "./travellerService";
import visaSystemService from "./visaSystemService";

//reducer from src\redux\reducer.js ^p

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



function* retrieveVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.fetch, retrieveSystemSaga);
}
function* createVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.create, createSystemSaga);
}
function* updateVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.update, updateSystemSaga);
}
function* deleteVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.delete, deleteSystemSaga);
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
    yield put(travellerSlice.actions.fetch({path: '/customer'}));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* updateCaravanSaga(action) {
  try {
    yield call(travellerService.updateTraveller, action.payload);
    yield put(travellerSlice.actions.updateSuccess(action.payload));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* deleteCaravanSaga(action) {
  try {
    yield call(travellerService.deleteSystem, action.payload);
    yield put(travellerSlice.actions.deleteSuccess(action.payload));
    yield put(travellerSlice.actions.fetch({path: '/' + action.payload.split('/')[0]}));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}

function* retrieveSystemSaga(action) {
  try {
    const result = yield call(visaSystemService.getSystems, action.payload);
    yield put(systemSlice.actions.fetchSuccess(result));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}
function* createSystemSaga(action) {
  try {
    const result = yield call(visaSystemService.createSystem, action.payload);
    yield put(systemSlice.actions.createSuccess({ ...result }));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}
function* updateSystemSaga(action) {
  try {
    yield call(visaSystemService.updateSystem, action.payload);
    yield put(systemSlice.actions.updateSuccess(action.payload));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}
function* deleteSystemSaga(action) {
  try {
    yield call(visaSystemService.deleteSystem, action.payload);
    yield put(systemSlice.actions.deleteSuccess(action.payload));
    yield put(systemSlice.actions.fetch(action.payload.split('/')[0]));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}

export {
  retrieveVisaSystemsFlow as retrieveSystemsFlow,
  createVisaSystemsFlow as createSystemsFlow,
  updateVisaSystemsFlow as updateSystemsFlow,
  deleteVisaSystemsFlow as deleteSystemsFlow,
  retrieveCaravanFlow,
  createCaravanFlow ,
  updateCaravanFlow,
  deleteCaravanFlow,
};
