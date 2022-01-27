import { combineReducers } from "redux";
import { rootContainerReducer } from "../containers/routes/state/reducers";
import { authReducer } from "../containers/auth/state/reducers";
import { accountReducer } from "../containers/account/state/reducers";
import { adminSettingsReducer } from "../containers/admin-settings/state/reducers";
import { leaderboardReducer } from "../containers/leaderboard/state/reducers";
import { companyValuesReducer } from "../containers/company-values/state/reducers";
import { rewardsReducer } from "../containers/rewards/state/reducers";

export const rootReducer = combineReducers({
  root: rootContainerReducer,
  auth: authReducer,
  account: accountReducer,
  adminSettings: adminSettingsReducer,
  leaderboard: leaderboardReducer,
  companyValues: companyValuesReducer,
  rewards: rewardsReducer,
});
