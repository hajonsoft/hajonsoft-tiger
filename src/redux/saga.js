import _ from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createSystemsFlow,
  deleteSystemsFlow,
  retrieveSystemsFlow,
  updateSystemsFlow,
} from "../features/Dashboard/redux/saga";
import travellerService from "../features/Dashboard/redux/travellerService";
import { authService } from "./firebaseAuthService";
import { travellerSlice, userSlice } from "./reducer";

//reducer from src\redux\reducer.ts ^p
function* sagas() {
  yield all([
    loginFlow(),
    retrieveTravellersFlow(),
    createTravellerFlow(),
    updateTravellerFlow(),
    deleteTravellerFlow(),
    retrieveSystemsFlow(),
    createSystemsFlow(),
    updateSystemsFlow(),
    deleteSystemsFlow(),
  ]);
}
function* loginFlow() {
  yield takeLatest(userSlice.actions.fetch, loginSaga);
}

function* retrieveTravellersFlow() {
  yield takeLatest(travellerSlice.actions.fetch, retrieveTravellersSaga);
}
function* createTravellerFlow() {
  yield takeLatest(travellerSlice.actions.create, createTravellerSaga);
}
function* updateTravellerFlow() {
  yield takeLatest(travellerSlice.actions.update, updateTravellerSaga);
}
function* deleteTravellerFlow() {
  yield takeLatest(travellerSlice.actions.delete, deleteTravellerSaga);
}
function* retrieveTravellersSaga(action) {
  try {
    const result = yield call(travellerService.getTravellers, action.payload);
    yield put(travellerSlice.actions.fetchSuccess(result));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* createTravellerSaga(action) {
  try {
    const result = yield call(travellerService.createTraveller, action.payload);
    const groupName = _.last(action.payload.path.split("/"));
    yield put(
      travellerSlice.actions.createSuccess({
        [groupName]: { [result._fid]: [{ ...result }] },
      })
    );
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* updateTravellerSaga(action) {
  try {
    yield call(travellerService.updateTraveller, action.payload);
    yield put(travellerSlice.actions.updateSuccess(action.payload));
  } catch (e) {
    yield put(travellerSlice.actions.fail(e.message));
  }
}
function* deleteTravellerSaga(action) {
  try {
    yield call(travellerService.deleteTraveller, action.payload);
    yield put(travellerSlice.actions.deleteSuccess(action.payload));
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
