import { RESET_APP_STATE } from "../../global/state/types";
import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_REWARD_STATS,
  SET_ADD_CREDIT_CARD_DIALOG_CONFIG,
  SET_TOP_UP_DIALOG_CONFIG,
  SET_TEAM_POINT_TOP_UPS,
  SET_PAYMENT_DETAILS,
} from "./types";

type BillingStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  rewardStats: {
    purchasedPoints: number;
    redemptionPoints: number;
    redemptionCosts: number;
  };
  addCreditCardDialogConfig: {
    open: boolean;
    isCreatingSetupIntent: boolean;
    isSavingCardDetails: boolean;
    clientSecret: string;
  };
  topUpDialogConfig: {
    open: boolean;
    isFetchingPaymentMethods: boolean;
    cardDetails: any;
  };
  pointTopUps: Array<any>;
  paymentDetails: any;
};

const initialState: BillingStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  rewardStats: {
    purchasedPoints: 0,
    redemptionPoints: 0,
    redemptionCosts: 0,
  },
  addCreditCardDialogConfig: {
    open: false,
    isCreatingSetupIntent: false,
    isSavingCardDetails: false,
    clientSecret: "",
  },
  topUpDialogConfig: {
    open: false,
    isFetchingPaymentMethods: false,
    cardDetails: {},
  },
  pointTopUps: [],
  paymentDetails: {},
};

const billingReducer = (
  state: BillingStateType = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_APP_STATE:
      return { ...initialState };

    case SET_REWARD_STATS:
      return { ...state, rewardStats: action.payload };

    case SET_ADD_CREDIT_CARD_DIALOG_CONFIG:
      return {
        ...state,
        addCreditCardDialogConfig: {
          ...state.addCreditCardDialogConfig,
          ...action.payload,
        },
      };

    case SET_TOP_UP_DIALOG_CONFIG:
      return {
        ...state,
        topUpDialogConfig: { ...state.topUpDialogConfig, ...action.payload },
      };

    case SET_TEAM_POINT_TOP_UPS:
      return { ...state, pointTopUps: action.payload };

    case SET_PAYMENT_DETAILS:
      return { ...state, paymentDetails: action.payload };

    default:
      return { ...state };
  }
};

export default billingReducer;
