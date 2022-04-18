import {
  SET_MESSAGE,
  SET_IS_LOADING,
  SET_CATALOGS,
  SET_BRAND,
  SET_EXCHANGE_RATE,
  GET_CATALOGS_SAGA,
  GET_BRAND_SAGA,
  PLACE_GIFT_CARD_ORDER_SAGA,
  GET_EXCHANGE_RATE_SAGA,
} from "./types";

export const setMessage = (payload: any) => ({
  type: SET_MESSAGE,
  payload,
});

export const setIsLoading = (payload: any) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setCatalogs = (payload: any) => ({
  type: SET_CATALOGS,
  payload,
});

export const setBrand = (payload: any) => ({
  type: SET_BRAND,
  payload,
});

export const setExchangeRate = (payload: any) => ({
  type: SET_EXCHANGE_RATE,
  payload,
});

// async

export const getCatalogsSaga = (params?: any) => ({
  type: GET_CATALOGS_SAGA,
  params,
});

export const getBrandSaga = (params?: { brandKey: string }) => ({
  type: GET_BRAND_SAGA,
  params,
});

export const placeGiftCardOrderSaga = (payload: any) => ({
  type: PLACE_GIFT_CARD_ORDER_SAGA,
  payload,
});

export const getExchangeRateSaga = (params: {
  rewardCurrency: string;
  baseCurrency: string;
}) => ({
  type: GET_EXCHANGE_RATE_SAGA,
  params,
});
