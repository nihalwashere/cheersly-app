import { RESET_APP_STATE } from "../../global/state/types";
import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_TEAM_GETTING_STARTED_STEPS,
  SET_TEAM_ACTIVITY,
} from "./types";

type DashboardStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  gettingStartedSteps: {
    recognitionTeamCreated: boolean;
    companyValuesCreated: boolean;
    rewardRedemptionsEnabled: boolean;
    appEnabled: boolean;
    paymentMethodAdded: boolean;
  };
  activity: Array<any>;
};

const initialState: DashboardStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  gettingStartedSteps: {
    recognitionTeamCreated: false,
    companyValuesCreated: false,
    rewardRedemptionsEnabled: false,
    appEnabled: false,
    paymentMethodAdded: false,
  },
  activity: [],
};

const dashboardReducer = (
  state: DashboardStateType = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_APP_STATE:
      return { ...initialState };

    case SET_TEAM_GETTING_STARTED_STEPS:
      return { ...state, gettingStartedSteps: action.payload };

    case SET_TEAM_ACTIVITY:
      return { ...state, activity: action.payload };

    default:
      return { ...state };
  }
};

export default dashboardReducer;
