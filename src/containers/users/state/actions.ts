import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_USERS,
  SET_USERS_PAGINATION_CONFIG,
  GET_ALL_USERS_STATS_SAGA,
  UPDATE_COUNTRY_FOR_USER_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setUsers = (payload: any) => ({
  type: SET_USERS,
  payload,
});

export const setUsersPaginationConfig = (payload: any) => ({
  type: SET_USERS_PAGINATION_CONFIG,
  payload,
});

// async

export const getAllUsersStatsSaga = (params: {
  pageIndex: number;
  pageSize: number;
}) => ({
  type: GET_ALL_USERS_STATS_SAGA,
  params,
});

export const updateCountryForUserSaga = (payload: any) => ({
  type: UPDATE_COUNTRY_FOR_USER_SAGA,
  payload,
});
