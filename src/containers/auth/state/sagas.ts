import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  SIGNUP_SAGA,
  LOGIN_SAGA,
  VALIDATE_TOKEN_SAGA,
  LOGOUT_SAGA,
} from "./types";
import {
  setMessage,
  setIsLoading,
  setIsLoggedIn,
  setCurrentUser,
  resetAppState,
} from "./actions";
import { signup, login, validate } from "../../../graphql/api";
import { CHEERSLY_TOKEN, MESSAGE_SEVERITY } from "../../../utils/constants";

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
            id: user.slackUserData.id,
            teamId: user.slackUserData.team_id,
            profile: {
              email: user.slackUserData.profile?.email || "",
              realName: user.slackUserData.profile.real_name,
              avatar: user.slackUserData.profile.image_24,
            },
          })
        ),
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
            id: user.slackUserData.id,
            teamId: user.slackUserData.team_id,
            profile: {
              email: user.slackUserData.profile?.email || "",
              realName: user.slackUserData.profile.real_name,
              avatar: user.slackUserData.profile.image_24,
            },
          })
        ),
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

function* validateTokenHandler(): any {
  try {
    const response = yield call(validate);

    if (response.data.success) {
      const {
        data: {
          data: { user },
        },
      } = response;

      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(
          setCurrentUser({
            role: user.role,
            id: user.slackUserData.id,
            teamId: user.slackUserData.team_id,
            profile: {
              email: user.slackUserData.profile?.email || "",
              realName: user.slackUserData.profile.real_name,
              avatar: user.slackUserData.profile.image_24,
            },
          })
        ),
      ]);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem(CHEERSLY_TOKEN);
    window.location.href = "/login";
  }
}

function* logoutHandler(action: any): any {
  try {
    localStorage.removeItem(CHEERSLY_TOKEN);

    yield all([yield put(resetAppState())]);

    action.navigate("/login");
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
