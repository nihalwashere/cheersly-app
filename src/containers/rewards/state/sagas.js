import { takeEvery, put, call, all, delay, select } from "redux-saga/effects";
import {
  CREATE_REWARD_SAGA,
  DELETE_REWARD_SAGA,
  GET_REWARDS_LIST_SAGA,
  UPDATE_REWARD_SAGA,
  GET_REDEMPTION_REQUESTS_LIST_SAGA,
  CREATE_REDEMPTION_REQUEST_SAGA,
  SETTLE_REDEMPTION_REQUEST_SAGA,
  DECLINE_REDEMPTION_REQUEST_SAGA,
  GET_REWARDS_HISTORY_LIST_SAGA,
} from "./types";
import {
  setRewardsIsLoading,
  setRewardsList,
  getRewardsListSagaAction,
  getRedemptionRequestsListSagaAction,
  setSnackbarForRedemptionRequests,
  setRedemptionRequestsList,
  setRewardsHistoryList,
  setSnackbarForRewardsOverview,
} from "./actions";
import { getCheersStatSagaAction } from "../../routes/state/actions"; // root actions
import {
  getRedemptionRequestPageIndex,
  getRedemptionRequestPageSize,
} from "./selectors";
import {
  getRewardList,
  createReward,
  updateReward,
  deleteReward,
  getRedemptionRequestList,
  createRedemptionRequest,
  settleRedemptionRequest,
  declineRedemptionRequest,
  getRewardsHistoryList,
} from "../../../graphql/api";
import { SNACKBAR_SEVERITY_TYPES } from "../../../enums/snackBarSeverityTypes";

function* getRewardsListHandler(action) {
  try {
    yield put(setRewardsIsLoading(true));

    const response = yield call(getRewardList, action.payload);

    if (
      response &&
      response.data &&
      response.data.RewardList &&
      response.data.RewardList.data
    ) {
      yield put(setRewardsList(response.data.RewardList.data));
    }

    yield all([yield delay(1000), yield put(setRewardsIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

function* createRewardHandler(action) {
  try {
    const response = yield call(createReward, action.payload);

    if (
      response &&
      response.data &&
      response.data.CreateReward &&
      response.data.CreateReward.success
    ) {
      yield put(getRewardsListSagaAction());
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.SUCCESS,
          message: response.data.CreateReward.message,
        })
      );
    } else {
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.ERROR,
          message: response.errors[0].message,
        })
      );
    }

    yield all([
      yield delay(3000),
      yield put(setSnackbarForRewardsOverview({})),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* updateRewardHandler(action) {
  try {
    const response = yield call(updateReward, action.payload);

    if (
      response &&
      response.data &&
      response.data.UpdateReward &&
      response.data.UpdateReward.success
    ) {
      yield put(getRewardsListSagaAction());
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.SUCCESS,
          message: response.data.UpdateReward.message,
        })
      );
    } else {
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.ERROR,
          message: response.errors[0].message,
        })
      );
    }

    yield all([
      yield delay(3000),
      yield put(setSnackbarForRewardsOverview({})),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* deleteRewardHandler(action) {
  try {
    const response = yield call(deleteReward, action.payload);

    if (
      response &&
      response.data &&
      response.data.DeleteReward &&
      response.data.DeleteReward.success
    ) {
      yield put(getRewardsListSagaAction());
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.SUCCESS,
          message: response.data.DeleteReward.message,
        })
      );
    } else {
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.ERROR,
          message: response.errors[0].message,
        })
      );
    }

    yield all([
      yield delay(3000),
      yield put(setSnackbarForRewardsOverview({})),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* getRedemptionRequestsListHandler(action) {
  try {
    yield put(setRewardsIsLoading(true));

    const response = yield call(getRedemptionRequestList, action.payload);

    if (
      response &&
      response.data &&
      response.data.RedemptionRequestList &&
      response.data.RedemptionRequestList.data
    ) {
      yield put(
        setRedemptionRequestsList(response.data.RedemptionRequestList.data)
      );
    }

    yield all([yield delay(1000), yield put(setRewardsIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

function* createRedemptionRequestHandler(action) {
  try {
    const response = yield call(createRedemptionRequest, action.payload);

    if (
      response &&
      response.data &&
      response.data.CreateRedemptionRequest &&
      response.data.CreateRedemptionRequest.success
    ) {
      yield all([
        yield put(getCheersStatSagaAction()),
        yield put(
          setSnackbarForRewardsOverview({
            severity: SNACKBAR_SEVERITY_TYPES.SUCCESS,
            message: response.data.CreateRedemptionRequest.message,
          })
        ),
      ]);
    } else {
      yield put(
        setSnackbarForRewardsOverview({
          severity: SNACKBAR_SEVERITY_TYPES.ERROR,
          message: response.errors[0].message,
        })
      );
    }

    yield all([
      yield delay(3000),
      yield put(setSnackbarForRewardsOverview({})),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* settleRedemptionRequestHandler(action) {
  try {
    const response = yield call(settleRedemptionRequest, action.payload);

    if (
      response &&
      response.data &&
      response.data.SettleRedemptionRequest &&
      response.data.SettleRedemptionRequest.success
    ) {
      yield put(
        setSnackbarForRedemptionRequests({
          severity: SNACKBAR_SEVERITY_TYPES.SUCCESS,
          message: response.data.SettleRedemptionRequest.message,
        })
      );
      yield put(
        getRedemptionRequestsListSagaAction({
          pageIndex: yield select(getRedemptionRequestPageIndex),
          pageSize: yield select(getRedemptionRequestPageSize),
        })
      );
    } else {
      yield put(
        setSnackbarForRedemptionRequests({
          severity: SNACKBAR_SEVERITY_TYPES.ERROR,
          message: response.errors[0].message,
        })
      );
    }

    yield all([
      yield delay(3000),
      yield put(setSnackbarForRedemptionRequests({})),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* declineRedemptionRequestHandler(action) {
  try {
    const response = yield call(declineRedemptionRequest, action.payload);

    if (
      response &&
      response.data &&
      response.data.DeclineRedemptionRequest &&
      response.data.DeclineRedemptionRequest.success
    ) {
      yield put(
        setSnackbarForRedemptionRequests({
          severity: SNACKBAR_SEVERITY_TYPES.SUCCESS,
          message: response.data.DeclineRedemptionRequest.message,
        })
      );
      yield put(
        getRedemptionRequestsListSagaAction({
          pageIndex: yield select(getRedemptionRequestPageIndex),
          pageSize: yield select(getRedemptionRequestPageSize),
        })
      );
    } else {
      yield put(
        setSnackbarForRedemptionRequests({
          severity: SNACKBAR_SEVERITY_TYPES.ERROR,
          message: response.errors[0].message,
        })
      );
    }

    yield all([
      yield delay(3000),
      yield put(setSnackbarForRedemptionRequests({})),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* getRewardsHistoryListHandler(action) {
  try {
    yield put(setRewardsIsLoading(true));

    const response = yield call(getRewardsHistoryList, action.payload);

    if (
      response &&
      response.data &&
      response.data.RewardsHistoryList &&
      response.data.RewardsHistoryList.data
    ) {
      yield put(setRewardsHistoryList(response.data.RewardsHistoryList.data));
    }

    yield all([yield delay(1000), yield put(setRewardsIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

export default function* watchRewards() {
  yield takeEvery(GET_REWARDS_LIST_SAGA, getRewardsListHandler);
  yield takeEvery(CREATE_REWARD_SAGA, createRewardHandler);
  yield takeEvery(UPDATE_REWARD_SAGA, updateRewardHandler);
  yield takeEvery(DELETE_REWARD_SAGA, deleteRewardHandler);
  yield takeEvery(
    GET_REDEMPTION_REQUESTS_LIST_SAGA,
    getRedemptionRequestsListHandler
  );
  yield takeEvery(
    CREATE_REDEMPTION_REQUEST_SAGA,
    createRedemptionRequestHandler
  );
  yield takeEvery(
    SETTLE_REDEMPTION_REQUEST_SAGA,
    settleRedemptionRequestHandler
  );
  yield takeEvery(
    DECLINE_REDEMPTION_REQUEST_SAGA,
    declineRedemptionRequestHandler
  );
  yield takeEvery(GET_REWARDS_HISTORY_LIST_SAGA, getRewardsHistoryListHandler);
}
