import {
  SET_CURRENT_USER,
  VALIDATE_TOKEN_SAGA,
  AUTHORIZE_SAGA,
  LOGOUT_SAGA,
  RESET_INITIAL_AUTH_STATE,
} from "./types";

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});

export const resetInitialAuthState = () => ({
  type: RESET_INITIAL_AUTH_STATE,
});

// async

export const authorizeSagaAction = (payload, history) => ({
  type: AUTHORIZE_SAGA,
  payload,
  history,
});

export const validateTokenSagaAction = () => ({
  type: VALIDATE_TOKEN_SAGA,
});

export const logoutSagaAction = (history) => ({
  type: LOGOUT_SAGA,
  history,
});
