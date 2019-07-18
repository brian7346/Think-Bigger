import { takeEvery, put, call } from "redux-saga/effects";
import {
  SET_USER,
  SET_USER_ASYNC,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI
} from "actions/types";
import { tryLoginUserAction, getUserDataAction } from "actions/userActions";

function* setUserAsync(action) {
  yield put({ type: LOADING_UI });
  try {
    yield call(tryLoginUserAction, action.payload);

    action.history.push("/");
    const userData = yield call(getUserDataAction);

    yield put({ type: CLEAR_ERRORS });
    yield put({ type: SET_USER_ASYNC, payload: userData.data });
  } catch (e) {
    yield put({ type: SET_ERRORS, payload: e.response.data });
  }
}

export function* watchSetUser() {
  yield takeEvery(SET_USER, setUserAsync);
}
