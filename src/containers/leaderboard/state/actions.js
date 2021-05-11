import {
  SET_LEADERBOARD_IS_LOADING,
  RESET_INITIAL_LEADERBOARD_STATE,
  SET_LEADERBOARD_LIST,
  GET_LEADERBOARD_LIST_SAGA,
} from "./types";

export const setLeaderboardIsLoading = (payload) => ({
  type: SET_LEADERBOARD_IS_LOADING,
  payload,
});

export const resetInitialLeaderboardState = () => ({
  type: RESET_INITIAL_LEADERBOARD_STATE,
});

export const setLeaderBoardList = (payload) => ({
  type: SET_LEADERBOARD_LIST,
  payload,
});

export const getLeaderBoardListSagaAction = (payload) => ({
  type: GET_LEADERBOARD_LIST_SAGA,
  payload,
});
