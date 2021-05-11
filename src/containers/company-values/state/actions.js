import {
  SET_COMPANY_VALUES_LIST,
  RESET_INITIAL_COMPANY_VALUES_STATE,
  SET_COMPANY_VALUES_IS_LOADING,
  GET_COMPANY_VALUES_LIST_SAGA,
  CREATE_COMPANY_VALUES_SAGA,
  UPDATE_COMPANY_VALUES_SAGA,
  DELETE_COMPANY_VALUES_SAGA,
} from "./types";

export const setCompanyValuesIsLoading = (payload) => ({
  type: SET_COMPANY_VALUES_IS_LOADING,
  payload,
});

export const resetInitialCompanyValuesState = () => ({
  type: RESET_INITIAL_COMPANY_VALUES_STATE,
});

export const setCompanyValuesList = (payload) => ({
  type: SET_COMPANY_VALUES_LIST,
  payload,
});

// async

export const getCompanyValuesListSagaAction = () => ({
  type: GET_COMPANY_VALUES_LIST_SAGA,
});

export const createCompanyValuesSagaAction = (payload) => ({
  type: CREATE_COMPANY_VALUES_SAGA,
  payload,
});

export const updateCompanyValuesSagaAction = (payload) => ({
  type: UPDATE_COMPANY_VALUES_SAGA,
  payload,
});

export const deleteCompanyValuesSagaAction = (payload) => ({
  type: DELETE_COMPANY_VALUES_SAGA,
  payload,
});
