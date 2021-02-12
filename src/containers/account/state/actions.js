import {
  RESET_INITIAL_ACCOUNT_STATE,
  SET_SELECTED_SECTION_FOR_ACCOUNT,
} from "./types";

export const resetInitialAccountState = (payload) => ({
  type: RESET_INITIAL_ACCOUNT_STATE,
  payload,
});

export const setSelectedSectionForAccount = (payload) => ({
  type: SET_SELECTED_SECTION_FOR_ACCOUNT,
  payload,
});

// async
