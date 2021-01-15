import { call, put, takeLatest } from "redux-saga/effects";
import { systemSlice } from "../../../redux/reducer";
import visaSystemService from "./visaSystemService";

//reducer from src\redux\reducer.ts ^p

function* retrieveVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.fetch, retrieveSaga);
}
function* createVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.create, createSaga);
}
function* updateVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.update, updateSaga);
}
function* deleteVisaSystemsFlow() {
  yield takeLatest(systemSlice.actions.delete, deleteSaga);
}
function* retrieveSaga(action) {
  try {
    const result = yield call(visaSystemService.getSystems, action.payload);
    yield put(systemSlice.actions.fetchSuccess(result));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}
function* createSaga(action) {
  try {
    const result = yield call(visaSystemService.createSystem, action.payload);
    yield put(systemSlice.actions.createSuccess({ ...result }));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}
function* updateSaga(action) {
  try {
    yield call(visaSystemService.updateSystem, action.payload);
    yield put(systemSlice.actions.updateSuccess(action.payload));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}
function* deleteSaga(action) {
  try {
    yield call(visaSystemService.deleteSystem, action.payload);
    yield put(systemSlice.actions.deleteSuccess(action.payload));
  } catch (e) {
    yield put(systemSlice.actions.fail(e.message));
  }
}

export {
  retrieveVisaSystemsFlow as retrieveSystemsFlow,
  createVisaSystemsFlow as createSystemsFlow,
  updateVisaSystemsFlow as updateSystemsFlow,
  deleteVisaSystemsFlow as deleteSystemsFlow,
};
