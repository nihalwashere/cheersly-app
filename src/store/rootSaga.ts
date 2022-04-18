import { all } from "redux-saga/effects";
import globalSaga from "../containers/global/state/sagas";
import authSaga from "../containers/auth/state/sagas";
import usersSaga from "../containers/users/state/sagas";
import recognitionSaga from "../containers/recognition/state/sagas";
import redeemSaga from "../containers/redeem/state/sagas";
import settingsSaga from "../containers/settings/state/sagas";
import dashboardSaga from "../containers/dashboard/state/sagas";
import billingSaga from "../containers/billing/state/sagas";

export default function* rootSaga() {
  yield all([
    globalSaga(),
    authSaga(),
    usersSaga(),
    recognitionSaga(),
    redeemSaga(),
    settingsSaga(),
    dashboardSaga(),
    billingSaga(),
  ]);
}
