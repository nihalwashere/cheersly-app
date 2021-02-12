import { RESET_INITIAL_AUTH_STATE, SET_CURRENT_USER } from "./types";

const initialState = {
  slackUserId: "",
  slackTeamId: "",
  slackInstallation: {},
  slackUserData: {
    profile: {},
  },
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, ...action.payload };

    case RESET_INITIAL_AUTH_STATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};
