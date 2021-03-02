import { takeEvery, put, call } from "redux-saga/effects";
import { GET_CHEERS_STAT } from "./types";
import { setCheersStat } from "./actions";
import { getCheersStat } from "../../../graphql/api";

function* getCheersStatHandler() {
  try {
    const response = yield call(getCheersStat);

    if (response && response.data && response.data.CheersStat) {
      yield put(setCheersStat(response.data.CheersStat));
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* watchRootContainer() {
  yield takeEvery(GET_CHEERS_STAT, getCheersStatHandler);
}
