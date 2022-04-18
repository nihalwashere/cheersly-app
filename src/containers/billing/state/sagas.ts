import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  GET_REWARD_STATS_SAGA,
  PURCHASE_POINTS_SAGA,
  GET_TEAM_POINT_TOP_UPS_SAGA,
  GET_PAYMENT_DETAILS_SAGA,
  GET_PAYMENT_METHODS_SAGA,
  CREATE_SETUP_INTENT_SAGA,
  SAVE_CARD_DETAILS_SAGA,
} from "./types";
import {
  setMessage,
  setIsLoading,
  setRewardStats,
  setTeamPointTopUps,
  setTopUpDialogConfig,
  setAddCreditCardDialogConfig,
  setPaymentDetails,
} from "./actions";
import {
  getTeamRewardStats,
  createPaymentIntent,
  getTeamPointTopUps,
  getPaymentIntent,
  getPaymentMethods,
  createSetupIntent,
  addPaymentMethod,
} from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getRewardStatsHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getTeamRewardStats);

    if (response.success) {
      yield put(setRewardStats(response.data));
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

function* getTeamPointTopUpsHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getTeamPointTopUps);

    if (response.success) {
      yield put(setTeamPointTopUps(response.data));
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

function* purchasePointsHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(createPaymentIntent, action.payload);

    if (response.success) {
      yield all([
        yield getRewardStatsHandler(),
        yield getTeamPointTopUpsHandler(),
        yield put(
          setTopUpDialogConfig({
            open: false,
          })
        ),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
        ),
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

function* getPaymentDetailsHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getPaymentIntent, action.params);

    if (response.success) {
      yield put(setPaymentDetails(response.data));
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

function* getPaymentMethodsHandler(): any {
  try {
    yield put(setTopUpDialogConfig({ isFetchingPaymentMethods: true }));

    const response = yield call(getPaymentMethods);

    if (response.success) {
      yield put(setTopUpDialogConfig({ cardDetails: response?.data?.card }));
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.message,
        })
      );
    }

    yield put(setTopUpDialogConfig({ isFetchingPaymentMethods: false }));
  } catch (error) {
    console.error(error);
    yield put(setTopUpDialogConfig({ isFetchingPaymentMethods: false }));
  }
}

function* createSetupIntentHandler(): any {
  try {
    yield put(setAddCreditCardDialogConfig({ isCreatingSetupIntent: true }));

    const response = yield call(createSetupIntent);

    if (response?.success) {
      yield put(
        setAddCreditCardDialogConfig({
          clientSecret: response?.data?.clientSecret,
        })
      );
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.message,
        })
      );
    }

    yield put(setAddCreditCardDialogConfig({ isCreatingSetupIntent: false }));
  } catch (error) {
    console.error(error);
    yield put(setAddCreditCardDialogConfig({ isCreatingSetupIntent: false }));
  }
}

function* saveCardDetailsHandler(action: any): any {
  try {
    const { stripe, elements, CardElement, clientSecret, cardHolderName } =
      action.payload;

    yield put(setAddCreditCardDialogConfig({ isSavingCardDetails: true }));

    const response = yield stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        // @ts-ignore
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardHolderName,
        },
      },
    });

    if (response?.error) {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response?.error?.message,
        })
      );
    } else {
      if (response?.setupIntent?.payment_method) {
        yield call(addPaymentMethod, {
          paymentMethodId: response.setupIntent.payment_method,
        });
      }

      yield all([
        yield put(setAddCreditCardDialogConfig({ open: false })),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: "Payment method added successfully.",
          })
        ),
        yield getPaymentMethodsHandler(),
      ]);
    }

    yield put(setAddCreditCardDialogConfig({ isSavingCardDetails: false }));
  } catch (error) {
    console.error(error);
    yield put(setAddCreditCardDialogConfig({ isSavingCardDetails: false }));
  }
}

export default function* watchBilling() {
  yield takeLatest(GET_REWARD_STATS_SAGA, getRewardStatsHandler);
  yield takeLatest(GET_TEAM_POINT_TOP_UPS_SAGA, getTeamPointTopUpsHandler);
  yield takeLatest(PURCHASE_POINTS_SAGA, purchasePointsHandler);
  yield takeLatest(GET_PAYMENT_DETAILS_SAGA, getPaymentDetailsHandler);
  yield takeLatest(GET_PAYMENT_METHODS_SAGA, getPaymentMethodsHandler);
  yield takeLatest(CREATE_SETUP_INTENT_SAGA, createSetupIntentHandler);
  yield takeLatest(SAVE_CARD_DETAILS_SAGA, saveCardDetailsHandler);
}
