import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_TEAM_GETTING_STARTED_STEPS_SAGA,
  GET_TEAM_ACTIVITY_SAGA,
  ENABLE_APP_FOR_TEAM_SAGA,
} from "./types";
import {
  setMessage,
  setIsLoading,
  setTeamGettingStartedSteps,
  setTeamActivity,
} from "./actions";
import { getTeam, getTeamActivity, enableApp } from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getTeamGettingStartedStepsHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getTeam);

    if (response.success) {
      yield put(
        setTeamGettingStartedSteps({
          recognitionTeamCreated: response.data.recognitionTeamCreated,
          companyValuesCreated: response.data.companyValuesCreated,
          rewardRedemptionsEnabled: response.data.rewardRedemptionsEnabled,
          appEnabled: response.data.appEnabled,
          paymentMethodAdded: response.data.paymentMethodAdded,
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

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

function* getTeamActivityHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getTeamActivity, action.params);

    if (response.success) {
      yield put(setTeamActivity(response.activity));
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

function* enableAppForTeamSaga(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(enableApp, action.payload);

    if (response.success) {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.SUCCESS,
          value: response.message,
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

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

export default function* watchDashboard() {
  yield takeLatest(
    GET_TEAM_GETTING_STARTED_STEPS_SAGA,
    getTeamGettingStartedStepsHandler
  );
  yield takeLatest(GET_TEAM_ACTIVITY_SAGA, getTeamActivityHandler);
  yield takeLatest(ENABLE_APP_FOR_TEAM_SAGA, enableAppForTeamSaga);
}
