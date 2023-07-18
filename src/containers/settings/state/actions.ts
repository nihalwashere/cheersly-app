import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_TEAM_SETTINGS,
  GET_TEAM_SETTINGS_SAGA,
  UPDATE_TEAM_SETTINGS_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setTeamSettings = (payload: any) => ({
  type: SET_TEAM_SETTINGS,
  payload,
});

// async

export const getTeamSettingsSaga = () => ({
  type: GET_TEAM_SETTINGS_SAGA,
});

export const updateTeamSettingsSaga = (payload: any) => ({
  type: UPDATE_TEAM_SETTINGS_SAGA,
  payload,
});
