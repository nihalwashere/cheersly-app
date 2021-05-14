import {
  SET_REWARDS_IS_LOADING,
  SET_REWARDS_LIST,
  GET_REWARDS_LIST_SAGA,
  RESET_INITIAL_REWARDS_STATE,
  SET_SNACKBAR_FOR_REDEMPTION_REQUESTS,
  SET_REDEMPTION_REQUESTS_PAGE_INDEX,
  SET_REDEMPTION_REQUESTS_PAGE_SIZE,
  SET_SELECTED_SECTION_FOR_REWARDS,
  CREATE_REWARD_SAGA,
  UPDATE_REWARD_SAGA,
  DELETE_REWARD_SAGA,
  GET_REDEMPTION_REQUESTS_LIST_SAGA,
  CREATE_REDEMPTION_REQUEST_SAGA,
  SETTLE_REDEMPTION_REQUEST_SAGA,
  DECLINE_REDEMPTION_REQUEST_SAGA,
  SET_REDEMPTION_REQUESTS_LIST,
  SET_REWARDS_HISTORY_LIST,
  SET_REWARDS_HISTORY_PAGE_INDEX,
  SET_REWARDS_HISTORY_PAGE_SIZE,
  GET_REWARDS_HISTORY_LIST_SAGA,
  SET_SNACKBAR_FOR_REWARDS_HISTORY,
} from "./types";

export const setRewardsIsLoading = (payload) => ({
  type: SET_REWARDS_IS_LOADING,
  payload,
});

export const resetInitialRewardsState = () => ({
  type: RESET_INITIAL_REWARDS_STATE,
});

export const setRewardsList = (payload) => ({
  type: SET_REWARDS_LIST,
  payload,
});

export const setSelectedSectionForRewards = (payload) => ({
  type: SET_SELECTED_SECTION_FOR_REWARDS,
  payload,
});

export const setSnackbarForRedemptionRequests = (payload) => ({
  type: SET_SNACKBAR_FOR_REDEMPTION_REQUESTS,
  payload,
});

export const setRedemptionRequestsList = (payload) => ({
  type: SET_REDEMPTION_REQUESTS_LIST,
  payload,
});

export const setRedemptionRequestsPageIndex = (payload) => ({
  type: SET_REDEMPTION_REQUESTS_PAGE_INDEX,
  payload,
});

export const setRedemptionRequestsPageSize = (payload) => ({
  type: SET_REDEMPTION_REQUESTS_PAGE_SIZE,
  payload,
});

export const setRewardsHistoryList = (payload) => ({
  type: SET_REWARDS_HISTORY_LIST,
  payload,
});

export const setRewardsHistoryPageIndex = (payload) => ({
  type: SET_REWARDS_HISTORY_PAGE_INDEX,
  payload,
});

export const setRewardsHistoryPageSize = (payload) => ({
  type: SET_REWARDS_HISTORY_PAGE_SIZE,
  payload,
});

export const setSnackbarForRewardsHistory = (payload) => ({
  type: SET_SNACKBAR_FOR_REWARDS_HISTORY,
  payload,
});

// async

export const getRewardsListSagaAction = (payload) => ({
  type: GET_REWARDS_LIST_SAGA,
  payload,
});

export const createRewardSagaAction = (payload) => ({
  type: CREATE_REWARD_SAGA,
  payload,
});

export const updateRewardSagaAction = (payload) => ({
  type: UPDATE_REWARD_SAGA,
  payload,
});

export const deleteRewardSagaAction = (payload) => ({
  type: DELETE_REWARD_SAGA,
  payload,
});

export const getRedemptionRequestsListSagaAction = (payload) => ({
  type: GET_REDEMPTION_REQUESTS_LIST_SAGA,
  payload,
});

export const createRedemptionRequestSagaAction = (payload) => ({
  type: CREATE_REDEMPTION_REQUEST_SAGA,
  payload,
});

export const settlteRedemptionRequestSagaAction = (payload) => ({
  type: SETTLE_REDEMPTION_REQUEST_SAGA,
  payload,
});

export const declineRedemptionRequestSagaAction = (payload) => ({
  type: DECLINE_REDEMPTION_REQUEST_SAGA,
  payload,
});

export const getRewardsHistoryListSagaAction = (payload) => ({
  type: GET_REWARDS_HISTORY_LIST_SAGA,
  payload,
});
