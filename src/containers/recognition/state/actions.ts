import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_SLACK_CHANNELS,
  SET_TEAMS,
  SET_TEAM_DETAILS,
  SET_COMPANY_VALUES,
  GET_COMPANY_VALUES_SAGA,
  GET_SLACK_CHANNELS_SAGA,
  GET_ALL_TEAMS_SAGA,
  GET_TEAM_DETAILS_SAGA,
  CREATE_TEAM_SAGA,
  UPDATE_TEAM_SAGA,
  DELETE_TEAM_SAGA,
  CREATE_COMPANY_VALUES_SAGA,
  UPDATE_COMPANY_VALUES_SAGA,
  DELETE_COMPANY_VALUES_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setSlackChannels = (payload: any) => ({
  type: SET_SLACK_CHANNELS,
  payload,
});

export const setTeams = (payload: any) => ({
  type: SET_TEAMS,
  payload,
});

export const setTeamDetails = (payload: any) => ({
  type: SET_TEAM_DETAILS,
  payload,
});

export const setCompanyValues = (payload: any) => ({
  type: SET_COMPANY_VALUES,
  payload,
});

// async

export const getSlackChannelsSaga = () => ({
  type: GET_SLACK_CHANNELS_SAGA,
});

export const getAllTeamsSaga = () => ({
  type: GET_ALL_TEAMS_SAGA,
});

export const getTeamDetailsSaga = (id: string) => ({
  type: GET_TEAM_DETAILS_SAGA,
  id,
});

export const createTeamSaga = (payload: any) => ({
  type: CREATE_TEAM_SAGA,
  payload,
});

export const updateTeamSaga = (id: string, payload: any) => ({
  type: UPDATE_TEAM_SAGA,
  id,
  payload,
});

export const deleteTeamSaga = (id: string) => ({
  type: DELETE_TEAM_SAGA,
  id,
});

export const getCompanyValuesSaga = () => ({
  type: GET_COMPANY_VALUES_SAGA,
});

export const createCompanyValuesSaga = (payload: any) => ({
  type: CREATE_COMPANY_VALUES_SAGA,
  payload,
});

export const updateCompanyValuesSaga = (id: string, payload: any) => ({
  type: UPDATE_COMPANY_VALUES_SAGA,
  id,
  payload,
});

export const deleteCompanyValuesSaga = (id: string) => ({
  type: DELETE_COMPANY_VALUES_SAGA,
  id,
});
