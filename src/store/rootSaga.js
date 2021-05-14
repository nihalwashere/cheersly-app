import { all } from "redux-saga/effects";
import rootContainer from "../containers/root/state/sagas";
import authSaga from "../containers/auth/state/sagas";
// import accountSaga from "../containers/account/state/sagas";
import adminSettingsSaga from "../containers/admin-settings/state/sagas";
import leaderboardSaga from "../containers/leaderboard/state/sagas";
import companyValuesSaga from "../containers/company-values/state/sagas";
import rewardsSaga from "../containers/rewards/state/sagas";

export default function* rootSaga() {
  yield all([
    rootContainer(),
    authSaga(),
    // accountSaga()
    adminSettingsSaga(),
    leaderboardSaga(),
    companyValuesSaga(),
    rewardsSaga(),
  ]);
}
