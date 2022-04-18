import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  GET_CATALOGS_SAGA,
  GET_BRAND_SAGA,
  PLACE_GIFT_CARD_ORDER_SAGA,
  GET_EXCHANGE_RATE_SAGA,
} from "./types";
import {
  setMessage,
  setIsLoading,
  setCatalogs,
  setBrand,
  setExchangeRate,
} from "./actions";
import {
  getTeamPointBalanceSaga,
  getUserPointBalanceSaga,
} from "../../global/state/actions";
import { getCatalogs, placeOrder, getExchangeRate } from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getCatalogsHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getCatalogs, action.params);

    if (response.success) {
      yield put(setCatalogs(response.data));
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.message,
        })
      );
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

function* getBrandHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getCatalogs, action.params);

    if (response.success) {
      yield put(setBrand(response.data.brands[0]));
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.message,
        })
      );
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

function* placeGiftCardOrderHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(placeOrder, action.payload);

    if (response.success) {
      yield all([
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
        ),
        yield put(getTeamPointBalanceSaga()),
        yield put(getUserPointBalanceSaga()),
      ]);
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.message,
        })
      );
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

function* getExchangeRateHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getExchangeRate, action.params);

    if (response.success) {
      yield put(setExchangeRate(response.data));
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.message,
        })
      );
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

export default function* watchRedeem() {
  yield takeLatest(GET_CATALOGS_SAGA, getCatalogsHandler);
  yield takeLatest(GET_BRAND_SAGA, getBrandHandler);
  yield takeLatest(PLACE_GIFT_CARD_ORDER_SAGA, placeGiftCardOrderHandler);
  yield takeLatest(GET_EXCHANGE_RATE_SAGA, getExchangeRateHandler);
}
