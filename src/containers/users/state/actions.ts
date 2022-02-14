import {
  SET_MESSAGE,
  SET_IS_LOADING,
  RESET_APP_STATE,
  SET_USERS,
  GET_ALL_USERS_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const resetAppState = () => ({
  type: RESET_APP_STATE,
});

export const setUsers = (payload: any) => ({
  type: SET_USERS,
  payload,
});

// async

export const getAllUsersSaga = (params: any) => ({
  type: GET_ALL_USERS_SAGA,
  params,
});
