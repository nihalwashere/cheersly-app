import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_IS_LOGGED_IN,
  SET_CURRENT_USER,
  RESET_APP_STATE,
  SIGNUP_SAGA,
  LOGIN_SAGA,
  VALIDATE_TOKEN_SAGA,
  LOGOUT_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoggedIn = (payload: any) => ({
  type: SET_IS_LOGGED_IN,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setCurrentUser = (payload: any) => ({
  type: SET_CURRENT_USER,
  payload,
});

export const resetAppState = () => ({
  type: RESET_APP_STATE,
});

// async

export const signupSaga = (payload: any, navigate: any) => ({
  type: SIGNUP_SAGA,
  payload,
  navigate,
});

export const loginSaga = (payload: any, navigate: any) => ({
  type: LOGIN_SAGA,
  payload,
  navigate,
});

export const validateTokenSaga = () => ({
  type: VALIDATE_TOKEN_SAGA,
});

export const logoutSaga = (navigate: any) => ({
  type: LOGOUT_SAGA,
  navigate,
});
