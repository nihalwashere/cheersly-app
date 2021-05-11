import { takeEvery, put, all } from "redux-saga/effects";
import { AUTHORIZE_SAGA, LOGOUT_SAGA, VALIDATE_TOKEN_SAGA } from "./types";
import { resetInitialAuthState, setCurrentUser } from "./actions";
import {
  resetInitialRootState,
  setSelectedNavSectionAction,
  getCheersStatSagaAction,
} from "../../root/state/actions"; // root actions
import { resetInitialLeaderboardState } from "../../leaderboard/state/actions"; // leaderboard actions
import { resetInitialAccountState } from "../../account/state/actions"; // account actions
import { authorizeSlack, validateToken } from "../../../graphql/api";
import {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_REDIRECT_URI,
} from "../../../utils/config";
import { CHEERSLY_TOKEN } from "../../../utils/constants";
import { resolveRoute } from "../../root/helper";
import { NAVIGATION_SECTION } from "../../../enums/navigationRoutes";

function* authorizeHandler(action) {
  try {
    const {
      payload: { code },
    } = action;

    const details = {
      client_id: SLACK_CLIENT_ID,
      client_secret: SLACK_CLIENT_SECRET,
      code,
      redirect_uri: SLACK_REDIRECT_URI,
    };

    const response = yield authorizeSlack(details);

    if (response && response.authed_user) {
      const stringToEncode = `${response.authed_user.id}$${response.team.id}`;
      const token = btoa(stringToEncode);

      localStorage.setItem(CHEERSLY_TOKEN, token);

      const res = yield validateToken();

      if (res.status === 200) {
        yield all([
          yield put(
            setCurrentUser({
              slackUserId: res.slackUserId,
              slackTeamId: res.slackTeamId,
              slackInstallation: res.slackInstallation,
              slackUserData: res.slackUserData,
              isLoggedIn: true,
            })
          ),
          yield put(
            setSelectedNavSectionAction(NAVIGATION_SECTION.LEADERBOARD)
          ),
          yield put(getCheersStatSagaAction()),
        ]);

        action.history.push("/leaderboard");
      } else {
        localStorage.removeItem(CHEERSLY_TOKEN);
        window.location.href = "/login";
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function* validateTokenHandler() {
  try {
    const token = localStorage.getItem(CHEERSLY_TOKEN);

    if (!token) {
      window.location.href = "/login";
    }

    const response = yield validateToken();

    if (response.status === 200) {
      yield all([
        yield put(
          setCurrentUser({
            slackUserId: response.slackUserId,
            slackTeamId: response.slackTeamId,
            slackInstallation: response.slackInstallation,
            slackUserData: response.slackUserData,
            isLoggedIn: true,
          })
        ),
        yield put(
          setSelectedNavSectionAction(resolveRoute(window.location.pathname))
        ),
        yield put(getCheersStatSagaAction()),
      ]);
    } else {
      localStorage.removeItem(CHEERSLY_TOKEN);
      window.location.href = "/login";
    }
  } catch (error) {
    console.error(error);
  }
}

function* logoutHandler(action) {
  try {
    localStorage.removeItem(CHEERSLY_TOKEN);

    yield all([
      yield put(resetInitialAuthState()), // flush auth state
      yield put(resetInitialRootState()), // flush root state
      yield put(resetInitialAccountState()), // flush account state
      yield put(resetInitialLeaderboardState()), // flush leaderboard state
    ]);

    action.history.push("/login");
  } catch (error) {
    console.error(error);
  }
}

export default function* watchAuth() {
  yield takeEvery(AUTHORIZE_SAGA, authorizeHandler);
  yield takeEvery(VALIDATE_TOKEN_SAGA, validateTokenHandler);
  yield takeEvery(LOGOUT_SAGA, logoutHandler);
}
