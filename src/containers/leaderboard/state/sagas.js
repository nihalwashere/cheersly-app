import { takeEvery, put, call, all, delay } from "redux-saga/effects";
import { GET_LEADERBOARD_LIST_SAGA } from "./types";
import { setLeaderboardIsLoading, setLeaderBoardList } from "./actions";
import { getLeaderBoardList } from "../../../graphql/api";

function* getLeaderBoardListHandler(action) {
  try {
    yield put(setLeaderboardIsLoading(true));

    const response = yield call(getLeaderBoardList, action.payload);

    if (
      response &&
      response.data &&
      response.data.LeaderBoardList &&
      response.data.LeaderBoardList.data
    ) {
      yield put(setLeaderBoardList(response.data.LeaderBoardList.data));
    }

    yield all([yield delay(200), yield put(setLeaderboardIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

export default function* watchLeaderboard() {
  yield takeEvery(GET_LEADERBOARD_LIST_SAGA, getLeaderBoardListHandler);
}
