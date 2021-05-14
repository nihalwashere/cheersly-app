import {
  SET_ADMIN_SETTINGS_LIST,
  RESET_INITIAL_ADMIN_SETTINGS_STATE,
  SET_ADMIN_SETTINGS_IS_LOADING,
} from "./types";

const initialState = {
  isLoading: false,
  adminSettings: [],
};

export const adminSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_SETTINGS_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_INITIAL_ADMIN_SETTINGS_STATE:
      return { ...initialState };

    case SET_ADMIN_SETTINGS_LIST:
      return { ...state, adminSettings: action.payload };

    default:
      return { ...state };
  }
};
