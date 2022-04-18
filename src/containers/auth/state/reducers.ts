import { RESET_APP_STATE } from "../../global/state/types";
import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_IS_LOGGED_IN,
  SET_CURRENT_USER,
} from "./types";

type LoginStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  user: {
    id: string;
    teamId: string;
    role: string;
    country: string;
    profile: {
      email: string;
      realName: string;
      avatar: string;
    };
  };
};

const initialState: LoginStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  isLoggedIn: false,
  user: {
    id: "",
    teamId: "",
    country: "",
    role: "",
    profile: {
      email: "",
      realName: "",
      avatar: "",
    },
  },
};

const usersReducer = (state: LoginStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };

    case SET_CURRENT_USER:
      return { ...state, user: { ...action.payload } };

    case RESET_APP_STATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};

export default usersReducer;
