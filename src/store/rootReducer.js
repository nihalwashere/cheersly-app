import { combineReducers } from "redux";
import { rootContainerReducer } from "../containers/root/state/reducers";
import { authReducer } from "../containers/auth/state/reducers";
import { accountReducer } from "../containers/account/state/reducers";
import { leaderboardReducer } from "../containers/leaderboard/state/reducers";
import { companyValuesReducer } from "../containers/company-values/state/reducers";

export const rootReducer = combineReducers({
  root: rootContainerReducer,
  auth: authReducer,
  account: accountReducer,
  leaderboard: leaderboardReducer,
  companyValues: companyValuesReducer,
});
