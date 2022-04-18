import { RESET_APP_STATE } from "../../global/state/types";
import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_CATALOGS,
  SET_BRAND,
  SET_EXCHANGE_RATE,
} from "./types";
import { DEFAULT_BASE_CURRENCY } from "../../../utils/constants";

type RedeemStateType = {
  message: {
    type: string;
    value: string;
  };
  isLoading: boolean;
  catalogs: {
    catalogName: string;
    brands: Array<any>;
  };
  brand: any;
  exchangeRate: {
    rewardCurrency: string;
    baseCurrency: string;
    baseFx: number;
  };
};

const initialState: RedeemStateType = {
  isLoading: false,
  message: {
    type: "",
    value: "",
  },
  catalogs: {
    catalogName: "",
    brands: [],
  },
  brand: {},
  exchangeRate: {
    rewardCurrency: "",
    baseCurrency: DEFAULT_BASE_CURRENCY,
    baseFx: 0,
  },
};

const redeemReducer = (state: RedeemStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET_APP_STATE:
      return { ...initialState };

    case SET_CATALOGS:
      return { ...state, catalogs: action.payload };

    case SET_BRAND:
      return { ...state, brand: action.payload };

    case SET_EXCHANGE_RATE:
      return { ...state, exchangeRate: action.payload };

    default:
      return { ...state };
  }
};

export default redeemReducer;
