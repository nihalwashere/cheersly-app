import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_IS_LOGGED_IN,
  SET_CURRENT_USER,
  RESET_INITIAL_LOGIN_STATE,
} from "./types";

type LoginStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  user: {
    id: number | null;
    email: string;
    name: string;
  };
};

const initialState: LoginStateType = {
  message: {
    type: "",
    value: "",
  },
  isLoading: false,
  isLoggedIn: false,
  user: {
    id: null,
    email: "",
    name: "",
  },
};

const loginReducer = (state: LoginStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };

    case SET_CURRENT_USER:
      return { ...state, user: { ...action.payload } };

    case RESET_INITIAL_LOGIN_STATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};

export default loginReducer;
