import { combineReducers } from "redux";
import loginReducer from "../containers/auth/state/reducers";

export const rootReducer = combineReducers({
  login: loginReducer,
});
