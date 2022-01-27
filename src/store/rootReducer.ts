import { combineReducers } from "redux";
import loginReducer from "../containers/login/state/reducers";

export const rootReducer = combineReducers({
  login: loginReducer,
});
