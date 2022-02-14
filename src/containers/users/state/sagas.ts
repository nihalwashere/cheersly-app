import { takeLatest, put, call } from "redux-saga/effects";
import { GET_ALL_USERS_SAGA } from "./types";
import { setMessage, setIsLoading, setUsers } from "./actions";
import { getAllUsers } from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getAllUsersHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getAllUsers, action.params);

    if (response.success) {
      yield put(setUsers(response.data));
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
  yield takeLatest(GET_ALL_USERS_SAGA, getAllUsersHandler);
}
