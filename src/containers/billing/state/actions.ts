import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_REWARD_STATS,
  SET_ADD_CREDIT_CARD_DIALOG_CONFIG,
  SET_TOP_UP_DIALOG_CONFIG,
  SET_TEAM_POINT_TOP_UPS,
  SET_PAYMENT_DETAILS,
  GET_REWARD_STATS_SAGA,
  PURCHASE_POINTS_SAGA,
  GET_TEAM_POINT_TOP_UPS_SAGA,
  GET_PAYMENT_DETAILS_SAGA,
  GET_PAYMENT_METHODS_SAGA,
  CREATE_SETUP_INTENT_SAGA,
  SAVE_CARD_DETAILS_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setRewardStats = (payload: any) => ({
  type: SET_REWARD_STATS,
  payload,
});

export const setAddCreditCardDialogConfig = (payload: any) => ({
  type: SET_ADD_CREDIT_CARD_DIALOG_CONFIG,
  payload,
});

export const setTopUpDialogConfig = (payload: any) => ({
  type: SET_TOP_UP_DIALOG_CONFIG,
  payload,
});

export const setTeamPointTopUps = (payload: any) => ({
  type: SET_TEAM_POINT_TOP_UPS,
  payload,
});

export const setPaymentDetails = (payload: any) => ({
  type: SET_PAYMENT_DETAILS,
  payload,
});

// async

export const getRewardStatsSaga = () => ({
  type: GET_REWARD_STATS_SAGA,
});

export const purchasePointsSaga = (payload: {
  points: number;
  pointCost: number;
  platformFee: number;
  totalCost: number;
}) => ({
  type: PURCHASE_POINTS_SAGA,
  payload,
});

export const getTeamPointTopUpsSaga = () => ({
  type: GET_TEAM_POINT_TOP_UPS_SAGA,
});

export const getPaymentDetailsSaga = (params: { paymentIntentId: string }) => ({
  type: GET_PAYMENT_DETAILS_SAGA,
  params,
});

export const getPaymentMethodsSaga = () => ({
  type: GET_PAYMENT_METHODS_SAGA,
});

export const createSetupIntentSaga = () => ({
  type: CREATE_SETUP_INTENT_SAGA,
});

export const saveCardDetailsSaga = (payload: any) => ({
  type: SAVE_CARD_DETAILS_SAGA,
  payload,
});
