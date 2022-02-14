import { all } from "redux-saga/effects";
import authSaga from "../containers/auth/state/sagas";
import usersSaga from "../containers/users/state/sagas";
import recognitionSaga from "../containers/recognition/state/sagas";

export default function* rootSaga() {
  yield all([authSaga(), usersSaga(), recognitionSaga()]);
}
