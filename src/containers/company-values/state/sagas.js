import { takeEvery, put, call, all, delay } from "redux-saga/effects";
import {
  GET_COMPANY_VALUES_LIST_SAGA,
  CREATE_COMPANY_VALUES_SAGA,
  UPDATE_COMPANY_VALUES_SAGA,
  DELETE_COMPANY_VALUES_SAGA,
} from "./types";
import {
  setCompanyValuesIsLoading,
  getCompanyValuesListSagaAction,
  setCompanyValuesList,
} from "./actions";
import {
  getCompanyValuesList,
  createCompanyValues,
  updateCompanyValues,
  deleteCompanyValues,
} from "../../../graphql/api";

function* getCompanyValuesListHandler() {
  try {
    yield put(setCompanyValuesIsLoading(true));

    const response = yield call(getCompanyValuesList);

    if (
      response &&
      response.data &&
      response.data.CompanyValuesList &&
      response.data.CompanyValuesList.data
    ) {
      yield put(setCompanyValuesList(response.data.CompanyValuesList.data));
    }

    yield all([yield delay(200), yield put(setCompanyValuesIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

function* createCompanyValuesHandler(action) {
  try {
    yield put(setCompanyValuesIsLoading(true));

    const response = yield call(createCompanyValues, action.payload);

    if (
      response &&
      response.data &&
      response.data.CreateCompanyValues &&
      response.data.CreateCompanyValues.success
    ) {
      yield put(getCompanyValuesListSagaAction());
    }

    yield all([yield delay(200), yield put(setCompanyValuesIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

function* updateCompanyValuesHandler(action) {
  try {
    yield put(setCompanyValuesIsLoading(true));

    const response = yield call(updateCompanyValues, action.payload);

    if (
      response &&
      response.data &&
      response.data.UpdateCompanyValues &&
      response.data.UpdateCompanyValues.success
    ) {
      yield put(getCompanyValuesListSagaAction());
    }

    yield all([yield delay(200), yield put(setCompanyValuesIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

function* deleteCompanyValuesHandler(action) {
  try {
    yield put(setCompanyValuesIsLoading(true));

    const response = yield call(deleteCompanyValues, action.payload);

    if (
      response &&
      response.data &&
      response.data.DeleteCompanyValues &&
      response.data.DeleteCompanyValues.success
    ) {
      yield put(getCompanyValuesListSagaAction());
    }

    yield all([yield delay(200), yield put(setCompanyValuesIsLoading(false))]);
  } catch (error) {
    console.error(error);
  }
}

export default function* watchCompanyValues() {
  yield takeEvery(GET_COMPANY_VALUES_LIST_SAGA, getCompanyValuesListHandler);
  yield takeEvery(CREATE_COMPANY_VALUES_SAGA, createCompanyValuesHandler);
  yield takeEvery(UPDATE_COMPANY_VALUES_SAGA, updateCompanyValuesHandler);
  yield takeEvery(DELETE_COMPANY_VALUES_SAGA, deleteCompanyValuesHandler);
}
