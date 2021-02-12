import { combineReducers } from "redux";
import { authReducer } from "../containers/auth/state/reducers";
import { accountReducer } from "../containers/account/state/reducers";
import { dashboardReducer } from "../containers/dashboard/state/reducers";
import { rootContainerReducer } from "../containers/root/state/reducers";

export const rootReducer = combineReducers({
  root: rootContainerReducer,
  auth: authReducer,
  account: accountReducer,
  dashboard: dashboardReducer,
});
