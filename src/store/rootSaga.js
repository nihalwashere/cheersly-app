import { all } from "redux-saga/effects";
import authSaga from "../containers/auth/state/sagas";
import dashboardSaga from "../containers/dashboard/state/sagas";
import rootContainer from "../containers/root/state/sagas";
// import accountSaga from "../containers/account/state/sagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
    rootContainer(),
    // accountSaga()
  ]);
}
