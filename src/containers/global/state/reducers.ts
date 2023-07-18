import {
  RESET_APP_STATE,
  SET_TEAM_POINT_BALANCE,
  SET_USER_POINT_BALANCE,
} from "./types";

type GlobalStateType = {
  teamPointBalance: number;
  userPointBalance: number;
};

const initialState: GlobalStateType = {
  teamPointBalance: 0,
  userPointBalance: 0,
};

const globalReducer = (state: GlobalStateType = initialState, action: any) => {
  switch (action.type) {
    case RESET_APP_STATE:
      return { ...initialState };

    case SET_TEAM_POINT_BALANCE:
      return { ...state, teamPointBalance: action.payload };

    case SET_USER_POINT_BALANCE:
      return { ...state, userPointBalance: action.payload };

    default:
      return { ...state };
  }
};

export default globalReducer;
