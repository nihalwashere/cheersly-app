import { DASHBOARD_SECTIONS } from "../../../enums/dashboardSections";
import {
  SET_SELECTED_SECTION_FOR_DASHBOARD,
  SET_DASHBOARD_IS_LOADING,
  RESET_INITIAL_DASHBOARD_STATE,
} from "./types";

const initialState = {
  selectedSection: DASHBOARD_SECTIONS.OVERVIEW,
  isLoading: false,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SECTION_FOR_DASHBOARD:
      return { ...state, selectedSection: action.payload };

    case SET_DASHBOARD_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_INITIAL_DASHBOARD_STATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};
