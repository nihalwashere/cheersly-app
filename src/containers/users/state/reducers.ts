import { RESET_APP_STATE } from "../../global/state/types";
import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_USERS,
  SET_USERS_PAGINATION_CONFIG,
} from "./types";

type UsersStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  users: Array<any>;
  page: number;
  rowsPerPage: number;
  totalCount: number;
};

const initialState: UsersStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  users: [],
  page: 0,
  rowsPerPage: 10,
  totalCount: 0,
};

const authReducer = (state: UsersStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_APP_STATE:
      return { ...initialState };

    case SET_USERS:
      return { ...state, users: action.payload };

    case SET_USERS_PAGINATION_CONFIG:
      return { ...state, ...action.payload };

    default:
      return { ...state };
  }
};

export default authReducer;
