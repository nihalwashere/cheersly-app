import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  GET_ALL_USERS_SAGA,
  GET_ALL_TEAMS_SAGA,
  CREATE_TEAM_SAGA,
  UPDATE_TEAM_SAGA,
  DELETE_TEAM_SAGA,
} from "./types";
import { setMessage, setIsLoading, setUsers } from "./actions";
import {
  getAllUsers,
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getAllUsersHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getAllUsers, action.params);

    console.log("response : ", response);

    if (response.data.success) {
      const {
        data: { data },
      } = response;

      yield put(setUsers(data));
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

export default function* watchUsers() {
  yield takeLatest(GET_ALL_USERS_SAGA, getAllUsersHandler);
}
