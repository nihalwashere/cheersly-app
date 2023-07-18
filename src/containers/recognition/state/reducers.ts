import { RESET_APP_STATE } from "../../global/state/types";
import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_SLACK_CHANNELS,
  SET_TEAMS,
  SET_TEAM_DETAILS,
  SET_COMPANY_VALUES,
} from "./types";

type RecognitionStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  slackChannels: Array<any>;
  teams: Array<any>;
  teamDetails: {
    name: string;
    channel: string;
    pointAllowance: string;
    pointAmountOptions: Array<any>;
    managers: Array<any>;
  };
  companyValues: Array<any>;
};

const initialState: RecognitionStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  slackChannels: [],
  teams: [],
  teamDetails: {
    name: "",
    channel: "",
    pointAllowance: "",
    pointAmountOptions: [],
    managers: [],
  },
  companyValues: [],
};

const recognitionReducer = (
  state: RecognitionStateType = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_APP_STATE:
      return { ...initialState };

    case SET_SLACK_CHANNELS:
      return { ...state, slackChannels: action.payload };

    case SET_TEAMS:
      return { ...state, teams: action.payload };

    case SET_TEAM_DETAILS:
      return { ...state, teamDetails: action.payload };

    case SET_COMPANY_VALUES:
      return { ...state, companyValues: action.payload };

    default:
      return { ...state };
  }
};

export default recognitionReducer;
