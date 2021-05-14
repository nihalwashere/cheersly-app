import { ACCOUNT_SECTIONS } from "../../../enums/accountSections";
import {
  RESET_INITIAL_ACCOUNT_STATE,
  SET_SELECTED_SECTION_FOR_ACCOUNT,
} from "./types";

const initialState = {
  selectedSection: ACCOUNT_SECTIONS.PROFILE,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SECTION_FOR_ACCOUNT:
      return { ...state, selectedSection: action.payload };

    case RESET_INITIAL_ACCOUNT_STATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};
