import { SET_SELECTED_NAV_SECTION, RESET_INITIAL_ROOT_STATE } from "./types";

export const setSelectedNavSectionAction = (payload) => ({
  type: SET_SELECTED_NAV_SECTION,
  payload,
});

export const resetInitialRootState = () => ({
  type: RESET_INITIAL_ROOT_STATE,
});
