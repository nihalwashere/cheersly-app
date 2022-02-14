import { combineReducers } from "redux";
import authReducer from "../containers/auth/state/reducers";
import usersReducer from "../containers/users/state/reducers";
import recognitionReducer from "../containers/recognition/state/reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  recognition: recognitionReducer,
});
