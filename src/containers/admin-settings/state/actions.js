import {
  SET_ADMIN_SETTINGS_IS_LOADING,
  SET_ADMIN_SETTINGS_LIST,
  GET_ADMIN_SETTINGS_LIST_SAGA,
  RESET_INITIAL_ADMIN_SETTINGS_STATE,
  SWITCH_ADMIN,
} from "./types";

export const setAdminSettingsIsLoading = (payload) => ({
  type: SET_ADMIN_SETTINGS_IS_LOADING,
  payload,
});

export const resetInitialAdminSettingsState = () => ({
  type: RESET_INITIAL_ADMIN_SETTINGS_STATE,
});

export const setAdminSettingsList = (payload) => ({
  type: SET_ADMIN_SETTINGS_LIST,
  payload,
});

// async

export const getAdminSettingsListSagaAction = (payload) => ({
  type: GET_ADMIN_SETTINGS_LIST_SAGA,
  payload,
});

export const switchAdminSagaAction = (payload) => ({
  type: SWITCH_ADMIN,
  payload,
});
