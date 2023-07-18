import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_TEAM_GETTING_STARTED_STEPS,
  SET_TEAM_ACTIVITY,
  GET_TEAM_GETTING_STARTED_STEPS_SAGA,
  GET_TEAM_ACTIVITY_SAGA,
  ENABLE_APP_FOR_TEAM_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setTeamGettingStartedSteps = (payload: any) => ({
  type: SET_TEAM_GETTING_STARTED_STEPS,
  payload,
});

export const setTeamActivity = (payload: any) => ({
  type: SET_TEAM_ACTIVITY,
  payload,
});

// async

export const getTeamGettingStartedStepsSaga = () => ({
  type: GET_TEAM_GETTING_STARTED_STEPS_SAGA,
});

export const getTeamActivitySaga = (params: {
  pageIndex: number;
  pageSize: number;
}) => ({
  type: GET_TEAM_ACTIVITY_SAGA,
  params,
});

export const enableAppForTeamSaga = (payload: any) => ({
  type: ENABLE_APP_FOR_TEAM_SAGA,
  payload,
});
