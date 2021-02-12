import { SET_SELECTED_NAV_SECTION, RESET_INITIAL_ROOT_STATE } from "./types";

const initialState = {
  selectedNavSection: "",
};

export const rootContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_NAV_SECTION:
      return { ...state, selectedNavSection: action.payload };

    case RESET_INITIAL_ROOT_STATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};
