import {
  SET_SELECTED_SECTION_FOR_DASHBOARD,
  SET_DASHBOARD_IS_LOADING,
  RESET_INITIAL_DASHBOARD_STATE,
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
