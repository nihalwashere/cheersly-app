import { takeEvery, put, call, all, delay } from "redux-saga/effects";
import { GET_ADMIN_SETTINGS_LIST_SAGA, SWITCH_ADMIN } from "./types";
import {
  getAdminSettingsListSagaAction,
  setAdminSettingsIsLoading,
  setAdminSettingsList,
} from "./actions";
import { getAdminSettingsList, adminSwitch } from "../../../graphql/api";
import { wrapAdminSettings } from "./helper";

function* getAdminSettingsListHandler(action) {
  try {
    yield put(setAdminSettingsIsLoading(true));

    const response = yield call(getAdminSettingsList, action.payload);

    if (
      response &&
      response.data &&
      response.data.AdminSettingsList &&
      response.data.AdminSettingsList.data
    ) {
      yield put(
        setAdminSettingsList(
          wrapAdminSettings(response.data.AdminSettingsList.data)
        )
      );
    }

    yield all([yield delay(200), yield put(setAdminSettingsIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

function* switchAdminHandler(action) {
  try {
    const { userId, isAdmin, pageIndex, pageSize } = action.payload;

    const response = yield call(adminSwitch, { userId, isAdmin });

    if (
      response &&
      response.data &&
      response.data.AdminSwitch &&
      response.data.AdminSwitch.success
    ) {
      yield put(
        getAdminSettingsListSagaAction({
          pageIndex,
          pageSize,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* watchAdminSettings() {
  yield takeEvery(GET_ADMIN_SETTINGS_LIST_SAGA, getAdminSettingsListHandler);
  yield takeEvery(SWITCH_ADMIN, switchAdminHandler);
}
