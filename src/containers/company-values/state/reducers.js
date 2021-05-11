import {
  SET_COMPANY_VALUES_IS_LOADING,
  RESET_INITIAL_COMPANY_VALUES_STATE,
  SET_COMPANY_VALUES_LIST,
} from "./types";

const initialState = {
  isLoading: false,
  companyValues: [],
};

export const companyValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_VALUES_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_INITIAL_COMPANY_VALUES_STATE:
      return { ...initialState };

    case SET_COMPANY_VALUES_LIST:
      return { ...state, companyValues: action.payload };

    default:
      return { ...state };
  }
};
