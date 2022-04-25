import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  SIGNUP_SAGA,
  LOGIN_SAGA,
  VALIDATE_TOKEN_SAGA,
  LOGOUT_SAGA,
} from "./types";
import {
  resetAppState,
  getTeamPointBalanceSaga,
  getUserPointBalanceSaga,
} from "../../global/state/actions";
import {
  setMessage,
  setIsLoading,
  setIsLoggedIn,
  setCurrentUser,
} from "./actions";
import { getTeamSettingsSaga } from "../../settings/state/actions"; // settings actions
import { signup, login, validate } from "../../../api";
import { CHEERSLY_TOKEN, MESSAGE_SEVERITY } from "../../../utils/constants";
import { USER_ROLE } from "../../../enums/userRoles";

const wrapUserProfile = (payload: any) => ({
  email: payload.slackUserData.profile?.email,
  realName: payload.slackUserData.profile.real_name,
  avatar: payload.slackUserData.profile.image_24,
});

function* appInit(): any {
  try {
    yield all([
      yield put(getTeamPointBalanceSaga()),
      yield put(getUserPointBalanceSaga()),
      yield put(getTeamSettingsSaga()),
    ]);
  } catch (error) {
    console.error(error);
  }
}

function* signupHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(signup, action.payload);

    if (response.data.success) {
      const {
        data: {
          data: { user },
        },
      } = response;

      localStorage.setItem(CHEERSLY_TOKEN, response.headers["x-access-token"]);

      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(
          setCurrentUser({
            role: user.role,
            country: user.country,
            id: user.slackUserData.id,
            teamId: user.slackUserData.team_id,
            profile: wrapUserProfile(user),
          })
        ),
        yield appInit(),
      ]);

      action.navigate("/dashboard/getting-started");
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.data.message,
        })
      );
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

function* loginHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(login, action.payload);

    if (response.data.success) {
      const {
        data: {
          data: { user },
        },
      } = response;

      localStorage.setItem(CHEERSLY_TOKEN, response.headers["x-access-token"]);

      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(
          setCurrentUser({
            role: user.role,
            country: user.country,
            id: user.slackUserData.id,
            teamId: user.slackUserData.team_id,
            profile: wrapUserProfile(user),
          })
        ),
        yield appInit(),
      ]);

      if (user?.role === USER_ROLE.MEMBER) {
        action.navigate("/redeem");
      } else {
        action.navigate("/dashboard/getting-started");
      }
    } else {
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.ERROR,
          value: response.data.message,
        })
      );
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
  }
}

function* validateTokenHandler(): any {
  try {
    const response = yield call(validate);

    if (response.success) {
      const {
        data: { user },
      } = response;

      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(
          setCurrentUser({
            role: user.role,
            country: user.country,
            id: user.slackUserData.id,
            teamId: user.slackUserData.team_id,
            profile: wrapUserProfile(user),
          })
        ),
        yield appInit(),
      ]);
    } else {
      localStorage.removeItem(CHEERSLY_TOKEN);
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem(CHEERSLY_TOKEN);
    window.location.href = "/login";
  }
}

function* logoutHandler(): any {
  try {
    localStorage.removeItem(CHEERSLY_TOKEN);

    yield put(resetAppState());

    window.location.href = "/login";
  } catch (error) {
    console.error(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(SIGNUP_SAGA, signupHandler);
  yield takeLatest(LOGIN_SAGA, loginHandler);
  yield takeLatest(VALIDATE_TOKEN_SAGA, validateTokenHandler);
  yield takeLatest(LOGOUT_SAGA, logoutHandler);
}
