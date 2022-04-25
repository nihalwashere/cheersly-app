import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  GET_SLACK_CHANNELS_SAGA,
  GET_ALL_TEAMS_SAGA,
  GET_TEAM_DETAILS_SAGA,
  CREATE_TEAM_SAGA,
  UPDATE_TEAM_SAGA,
  DELETE_TEAM_SAGA,
  CREATE_COMPANY_VALUES_SAGA,
  UPDATE_COMPANY_VALUES_SAGA,
  DELETE_COMPANY_VALUES_SAGA,
  GET_COMPANY_VALUES_SAGA,
} from "./types";
import {
  setMessage,
  setIsLoading,
  setTeams,
  setTeamDetails,
  setSlackChannels,
  setCompanyValues,
} from "./actions";
import {
  getSlackChannels,
  getAllTeams,
  getTeamDetails,
  createTeam,
  updateTeam,
  deleteTeam,
  getCompanyValues,
  createCompanyValues,
  updateCompanyValues,
  deleteCompanyValues,
} from "../../../api";
import { MESSAGE_SEVERITY } from "../../../utils/constants";

function* getSlackChannelsHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getSlackChannels);

    if (response.success) {
      yield put(setSlackChannels(response.data));
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

function* getAllTeamssHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getAllTeams);

    if (response.success) {
      yield put(setTeams(response.data));
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

function* getTeamDetailsHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getTeamDetails, action.id);

    if (response.success) {
      yield put(setTeamDetails(response.data));
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

function* createTeamHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(createTeam, action.payload);

    if (response.success) {
      yield all([
        yield getAllTeamssHandler(),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
        ),
      ]);

      action.navigate(`/recognition/teams/${response?.data?.id}`);
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

function* updateTeamHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(updateTeam, action.id, action.payload);

    if (response.success) {
      yield all([
        yield getAllTeamssHandler(),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
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

function* deleteTeamHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(deleteTeam, action.id);

    if (response.success) {
      yield all([
        yield getAllTeamssHandler(),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
        ),
      ]);

      action.navigate("/recognition/teams");
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

function* getCompanyValuesHandler(): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(getCompanyValues);

    if (response.success) {
      yield put(setCompanyValues(response.data));
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

function* createCompanyValuesHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(createCompanyValues, action.payload);

    if (response.success) {
      yield all([
        yield getCompanyValuesHandler(),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
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

function* updateCompanyValuesHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(updateCompanyValues, action.id, action.payload);

    if (response.success) {
      yield all([
        yield getCompanyValuesHandler(),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
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

function* deleteCompanyValuesHandler(action: any): any {
  try {
    yield put(setIsLoading(true));

    const response = yield call(deleteCompanyValues, action.id);

    if (response.success) {
      yield all([
        yield getCompanyValuesHandler(),
        yield put(
          setMessage({
            type: MESSAGE_SEVERITY.SUCCESS,
            value: response.message,
          })
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

export default function* watchRecognition() {
  yield takeLatest(GET_SLACK_CHANNELS_SAGA, getSlackChannelsHandler);
  yield takeLatest(GET_ALL_TEAMS_SAGA, getAllTeamssHandler);
  yield takeLatest(GET_TEAM_DETAILS_SAGA, getTeamDetailsHandler);
  yield takeLatest(CREATE_TEAM_SAGA, createTeamHandler);
  yield takeLatest(UPDATE_TEAM_SAGA, updateTeamHandler);
  yield takeLatest(DELETE_TEAM_SAGA, deleteTeamHandler);
  yield takeLatest(GET_COMPANY_VALUES_SAGA, getCompanyValuesHandler);
  yield takeLatest(CREATE_COMPANY_VALUES_SAGA, createCompanyValuesHandler);
  yield takeLatest(UPDATE_COMPANY_VALUES_SAGA, updateCompanyValuesHandler);
  yield takeLatest(DELETE_COMPANY_VALUES_SAGA, deleteCompanyValuesHandler);
}
