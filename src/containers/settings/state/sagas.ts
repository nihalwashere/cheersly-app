import { takeLatest, put, call } from "redux-saga/effects";
import { GET_TEAM_SETTINGS_SAGA, UPDATE_TEAM_SETTINGS_SAGA } from "./types";
import { setMessage, setIsLoading, setTeamSettings } from "./actions";
import { getTeamSettings, updateTeamSettings } from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getTeamSettingsHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getTeamSettings);

    if (response.success) {
      yield put(setTeamSettings(response.data));
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

function* updateTeamSettingsHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(updateTeamSettings, action.payload);

    if (response.success) {
      yield getTeamSettingsHandler();
      yield put(
        setMessage({
          type: MESSAGE_SEVERITY.SUCCESS,
          value: response.message,
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

export default function* watchSettings() {
  yield takeLatest(GET_TEAM_SETTINGS_SAGA, getTeamSettingsHandler);
  yield takeLatest(UPDATE_TEAM_SETTINGS_SAGA, updateTeamSettingsHandler);
}
