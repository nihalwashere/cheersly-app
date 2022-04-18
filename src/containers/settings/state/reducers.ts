import { RESET_APP_STATE } from "../../global/state/types";
import { SET_MESSAGE, SET_IS_LOADING, SET_TEAM_SETTINGS } from "./types";

type SettingsStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  settings: {
    isActivated: boolean | null;
    admins: Array<any>;
    allowanceReloaded: boolean | null;
    pointsAboutToExpire: boolean | null;
    inactivityReminders: boolean | null;
    pointsAvailableToRedeem: boolean | null;
    requireCompanyValues: boolean | null;
  };
};

const initialState: SettingsStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  settings: {
    isActivated: null,
    admins: [],
    allowanceReloaded: null,
    pointsAboutToExpire: null,
    inactivityReminders: null,
    pointsAvailableToRedeem: null,
    requireCompanyValues: null,
  },
};

const settingsReducer = (
  state: SettingsStateType = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_APP_STATE:
      return { ...initialState };

    case SET_TEAM_SETTINGS:
      return { ...state, settings: action.payload };

    default:
      return { ...state };
  }
};

export default settingsReducer;
