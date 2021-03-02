import {
  SET_SELECTED_NAV_SECTION,
  RESET_INITIAL_ROOT_STATE,
  SET_CHEERS_STAT,
} from "./types";

const initialState = {
  selectedNavSection: "",
  cheersStat: { cheersGiven: 0, cheersReceived: 0 },
};

export const rootContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_NAV_SECTION:
      return { ...state, selectedNavSection: action.payload };

    case RESET_INITIAL_ROOT_STATE:
      return { ...initialState };

    case SET_CHEERS_STAT:
      return { ...state, cheersStat: action.payload };

    default:
      return { ...state };
  }
};
