import { combineReducers } from "redux";
import globalReducer from "../containers/global/state/reducers";
import authReducer from "../containers/auth/state/reducers";
import usersReducer from "../containers/users/state/reducers";
import recognitionReducer from "../containers/recognition/state/reducers";
import redeemReducer from "../containers/redeem/state/reducers";
import settingsReducer from "../containers/settings/state/reducers";
import dashboardReducer from "../containers/dashboard/state/reducers";
import billingReducer from "../containers/billing/state/reducers";

export const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  users: usersReducer,
  recognition: recognitionReducer,
  redeem: redeemReducer,
  settings: settingsReducer,
  dashboard: dashboardReducer,
  billing: billingReducer,
});
