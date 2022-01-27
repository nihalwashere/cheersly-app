import { all } from "redux-saga/effects";
import loginSaga from "../containers/login/state/sagas";

export default function* rootSaga() {
  yield all([loginSaga()]);
}
