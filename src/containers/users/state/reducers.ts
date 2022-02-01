import {
  SET_MESSAGE,
  SET_IS_LOADING,
  RESET_APP_STATE,
  SET_USERS,
  SET_TEAMS,
} from "./types";

type UsersStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  users: Array<any>;
  teams: Array<any>;
};

const initialState: UsersStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  users: [],
  teams: [],
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

    case SET_TEAMS:
      return { ...state, teams: action.payload };

    default:
      return { ...state };
  }
};

export default authReducer;
