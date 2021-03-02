import {
  SET_SELECTED_NAV_SECTION,
  RESET_INITIAL_ROOT_STATE,
  SET_CHEERS_STAT,
  GET_CHEERS_STAT,
} from "./types";

export const setSelectedNavSectionAction = (payload) => ({
  type: SET_SELECTED_NAV_SECTION,
  payload,
});

export const resetInitialRootState = () => ({
  type: RESET_INITIAL_ROOT_STATE,
});

export const setCheersStat = (payload) => ({
  type: SET_CHEERS_STAT,
  payload,
});

// async

export const getCheersStatSagaAction = () => ({
  type: GET_CHEERS_STAT,
});
