import {
  SET_MESSAGE,
  SET_IS_LOADING,
  RESET_APP_STATE,
  SET_USERS,
  SET_TEAMS,
  GET_ALL_USERS_SAGA,
  GET_ALL_TEAMS_SAGA,
  CREATE_TEAM_SAGA,
  UPDATE_TEAM_SAGA,
  DELETE_TEAM_SAGA,
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

export const setTeams = (payload: any) => ({
  type: SET_TEAMS,
  payload,
});

// async

export const getAllUsersSaga = (params: any) => ({
  type: GET_ALL_USERS_SAGA,
  params,
});

export const getAllTeamsSaga = (payload: any) => ({
  type: GET_ALL_TEAMS_SAGA,
  payload,
});

export const createTeamSaga = (paylaod: any) => ({
  type: CREATE_TEAM_SAGA,
  paylaod,
});

export const updateTeamSaga = (payload: any) => ({
  type: UPDATE_TEAM_SAGA,
  payload,
});

export const deleteTeamSaga = (payload: any) => ({
  type: DELETE_TEAM_SAGA,
  payload,
});
