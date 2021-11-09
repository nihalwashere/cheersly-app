import {
  SET_ADMIN_SETTINGS_LIST,
  RESET_INITIAL_ADMIN_SETTINGS_STATE,
  SET_ADMIN_SETTINGS_IS_LOADING,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_TOTAL_COUNT,
} from "./types";

const initialState = {
  isLoading: false,
  adminSettings: [],
  page: 0,
  rowsPerPage: 10,
  totalCount: 0,
};

export const adminSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_SETTINGS_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_INITIAL_ADMIN_SETTINGS_STATE:
      return { ...initialState };

    case SET_ADMIN_SETTINGS_LIST:
      return { ...state, adminSettings: action.payload };

    case SET_PAGE:
      return { ...state, page: action.payload };

    case SET_ROWS_PER_PAGE:
      return { ...state, rowsPerPage: action.payload };

    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload };

    default:
      return { ...state };
  }
};
