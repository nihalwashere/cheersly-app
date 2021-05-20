import {
  RESET_INITIAL_REWARDS_STATE,
  SET_REWARDS_IS_LOADING,
  SET_SELECTED_SECTION_FOR_REWARDS,
  SET_REWARDS_LIST,
  SET_REWARDS_OVERVIEW_PAGE_INDEX,
  SET_REWARDS_OVERVIEW_PAGE_SIZE,
  SET_SNACKBAR_FOR_REWARDS_OVERVIEW,
  SET_SNACKBAR_FOR_REDEMPTION_REQUESTS,
  SET_REDEMPTION_REQUESTS_LIST,
  SET_REDEMPTION_REQUESTS_PAGE_INDEX,
  SET_REDEMPTION_REQUESTS_PAGE_SIZE,
  SET_REWARDS_HISTORY_LIST,
  SET_REWARDS_HISTORY_PAGE_INDEX,
  SET_REWARDS_HISTORY_PAGE_SIZE,
  SET_SNACKBAR_FOR_REWARDS_HISTORY,
} from "./types";
import { REWARD_SECTIONS } from "../../../enums/rewardSections";

const initialState = {
  isLoading: false,
  selectedSection: REWARD_SECTIONS.OVERVIEW,
  rewards: [],
  rewardsOverviewPageIndex: 0,
  rewardsOverviewPageSize: 30,
  snackBarForRewardsOverview: {
    severity: "",
    message: "",
  },

  redemptionRequests: [],
  redemptionRequestPageIndex: 0,
  redemptionRequestPageSize: 30,
  snackBarForRedemptionRequests: {
    severity: "",
    message: "",
  },

  rewardsHistory: [],
  rewardsHistoryPageIndex: 0,
  rewardsHistoryPageSize: 30,
  snackBarForRewardsHistory: {
    severity: "",
    message: "",
  },
};

export const rewardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REWARDS_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_INITIAL_REWARDS_STATE:
      return { ...initialState };

    case SET_SELECTED_SECTION_FOR_REWARDS:
      return { ...state, selectedSection: action.payload };

    case SET_REWARDS_LIST:
      return { ...state, rewards: action.payload };

    case SET_REWARDS_OVERVIEW_PAGE_INDEX:
      return { ...state, rewardsOverviewPageIndex: action.payload };

    case SET_REWARDS_OVERVIEW_PAGE_SIZE:
      return { ...state, rewardsOverviewPageSize: action.payload };

    case SET_SNACKBAR_FOR_REWARDS_OVERVIEW:
      return { ...state, snackBarForRewardsOverview: action.payload };

    case SET_REDEMPTION_REQUESTS_LIST:
      return { ...state, redemptionRequests: action.payload };

    case SET_REDEMPTION_REQUESTS_PAGE_INDEX:
      return { ...state, redemptionRequestPageIndex: action.payload };

    case SET_REDEMPTION_REQUESTS_PAGE_SIZE:
      return { ...state, redemptionRequestPageSize: action.payload };

    case SET_SNACKBAR_FOR_REDEMPTION_REQUESTS:
      return { ...state, snackBarForRedemptionRequests: action.payload };

    case SET_REWARDS_HISTORY_LIST:
      return { ...state, rewardsHistory: action.payload };

    case SET_REWARDS_HISTORY_PAGE_INDEX:
      return { ...state, rewardsHistoryPageIndex: action.payload };

    case SET_REWARDS_HISTORY_PAGE_SIZE:
      return { ...state, rewardsHistoryPageSize: action.payload };

    case SET_SNACKBAR_FOR_REWARDS_HISTORY:
      return { ...state, snackBarForRewardsHistory: action.payload };

    default:
      return { ...state };
  }
};
