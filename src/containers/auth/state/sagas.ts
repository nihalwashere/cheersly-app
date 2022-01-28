import { takeLatest, put, all, call } from "redux-saga/effects";
import { LOGIN_SAGA, VALIDATE_TOKEN_SAGA, LOGOUT_SAGA } from "./types";
import {
  setMessage,
  setIsLoading,
  setIsLoggedIn,
  setCurrentUser,
  resetInitialLoginState,
} from "./actions"; // login actions
// import { resetInitialDashboardState } from "../../dashboard/state/actions"; // dashboard actions
import { validateToken } from "../../../graphql/api";
import { CHEERSLY_TOKEN, MESSAGE_SEVERITY } from "../../../utils/constants";

// function* loginHandler(action: any): any {
//   try {
//     yield put(setIsLoading(true));

//     const response = yield call(login, action.payload);

//     if (response.status === 200) {
//       const { headers, data } = response;

//       localStorage.setItem(CHEERSLY_TOKEN, headers["access-token"]);

//       yield all([
//         yield put(setIsLoggedIn(true)),
//         yield put(
//           setCurrentUser({
//             id: data.data.id,
//             email: data.data.email,
//             uid: data.data.uid,
//           })
//         ),
//       ]);

//       action.navigate("/dashboard");
//     } else {
//       yield put(
//         setMessage({ type: MESSAGE_SEVERITY.ERROR, value: response.errors[0] })
//       );
//     }

//     yield put(setIsLoading(false));
//   } catch (error) {
//     console.error(error);
//     yield put(setIsLoading(false));
//   }
// }

function* validateTokenHandler(): any {
  try {
    const response = yield call(validateToken);

    if (response.status === 200) {
      const { data } = response;

      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(
          setCurrentUser({
            id: data[0].id,
            email: data[0].email,
            uid: data[0].uid,
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

// function* logoutHandler(action: any): any {
//   try {
//     localStorage.removeItem(CHEERSLY_TOKEN);

//     yield all([
//       yield call(logout),
//       yield put(resetInitialLoginState()), // flush login state
//       yield put(resetInitialDashboardState()), // flush dashboard state
//     ]);

//     action.navigate("/login");
//   } catch (error) {
//     console.error(error);
//   }
// }

export default function* watchLogin() {
  //   yield takeLatest(LOGIN_SAGA, loginHandler);
  yield takeLatest(VALIDATE_TOKEN_SAGA, validateTokenHandler);
  //   yield takeLatest(LOGOUT_SAGA, logoutHandler);
}
