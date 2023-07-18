import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_TEAM_POINT_BALANCE_SAGA,
  GET_USER_POINT_BALANCE_SAGA,
} from "./types";
import { setTeamPointBalance, setUserPointBalance } from "./actions";
import { getTeamPointBalance, getUserPointBalance } from "../../../api";

function* getTeamPointBalanceHandler(): any {
  try {
    const response = yield call(getTeamPointBalance);

    if (response.success) {
      yield put(setTeamPointBalance(response.data.balance));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getUserPointBalanceHandler(): any {
  try {
    const response = yield call(getUserPointBalance);

    if (response.success) {
      yield put(setUserPointBalance(response.data.balance));
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* watchGlobal() {
  yield takeLatest(GET_TEAM_POINT_BALANCE_SAGA, getTeamPointBalanceHandler);
  yield takeLatest(GET_USER_POINT_BALANCE_SAGA, getUserPointBalanceHandler);
}
