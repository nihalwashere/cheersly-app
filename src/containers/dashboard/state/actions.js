import {
  SET_SELECTED_SECTION_FOR_DASHBOARD,
  SET_DASHBOARD_IS_LOADING,
  RESET_INITIAL_DASHBOARD_STATE,
  SET_LEADERBOARD_LIST,
  GET_LEADERBOARD_LIST_SAGA,
} from "./types";

export const setSelectedSectionForDashboard = (payload) => ({
  type: SET_SELECTED_SECTION_FOR_DASHBOARD,
  payload,
});

export const setDashboardIsLoading = (payload) => ({
  type: SET_DASHBOARD_IS_LOADING,
  payload,
});

export const resetInitialDashboardState = () => ({
  type: RESET_INITIAL_DASHBOARD_STATE,
});

export const setLeaderBoardList = (payload) => ({
  type: SET_LEADERBOARD_LIST,
  payload,
});

export const getLeaderBoardListSagaAction = (payload) => ({
  type: GET_LEADERBOARD_LIST_SAGA,
  payload,
});
