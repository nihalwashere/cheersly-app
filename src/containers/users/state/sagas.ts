import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  GET_ALL_USERS_STATS_SAGA,
  UPDATE_COUNTRY_FOR_USER_SAGA,
} from "./types";
import {
  setMessage,
  setIsLoading,
  setUsers,
  setUsersPaginationConfig,
} from "./actions";
import { getAllUsersStats, updateUserCountry } from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";
import { setCurrentUser } from "../../auth/state/actions"; // auth actions

function* getAllUsersStatsHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getAllUsersStats, action.params);

    if (response.success) {
      yield all([
        yield put(setUsers(response.data)),
        yield put(
          setUsersPaginationConfig({ totalCount: Number(response.totalCount) })
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

function* updateCountryForUserHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(updateUserCountry, action.payload);

    if (response.success) {
      const {
        data: { user },
      } = response;

      yield put(
        setCurrentUser({
          role: user.role,
          country: user.country,
          id: user.slackUserData.id,
          teamId: user.slackUserData.team_id,
          profile: {
            email: user.slackUserData.profile?.email || "",
            realName: user.slackUserData.profile.real_name,
            avatar: user.slackUserData.profile.image_24,
          },
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

export default function* watchUsers() {
  yield takeLatest(GET_ALL_USERS_STATS_SAGA, getAllUsersStatsHandler);
  yield takeLatest(UPDATE_COUNTRY_FOR_USER_SAGA, updateCountryForUserHandler);
}
