import {
  RESET_APP_STATE,
  SET_TEAM_POINT_BALANCE,
  SET_USER_POINT_BALANCE,
  GET_TEAM_POINT_BALANCE_SAGA,
  GET_USER_POINT_BALANCE_SAGA,
} from "./types";

export const resetAppState = () => ({
  type: RESET_APP_STATE,
});

export const setTeamPointBalance = (payload: any) => ({
  type: SET_TEAM_POINT_BALANCE,
  payload,
});

export const setUserPointBalance = (payload: any) => ({
  type: SET_USER_POINT_BALANCE,
  payload,
});

// async

export const getTeamPointBalanceSaga = () => ({
  type: GET_TEAM_POINT_BALANCE_SAGA,
});

export const getUserPointBalanceSaga = () => ({
  type: GET_USER_POINT_BALANCE_SAGA,
});
