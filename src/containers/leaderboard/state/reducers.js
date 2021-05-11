import {
  SET_LEADERBOARD_IS_LOADING,
  RESET_INITIAL_LEADERBOARD_STATE,
  SET_LEADERBOARD_LIST,
} from "./types";

const initialState = {
  isLoading: false,
  leaderBoard: [],
};

export const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEADERBOARD_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_INITIAL_LEADERBOARD_STATE:
      return { ...initialState };

    case SET_LEADERBOARD_LIST:
      return { ...state, leaderBoard: action.payload };

    default:
      return { ...state };
  }
};
