import { takeEvery } from 'redux-saga/effects';
import presentationApi from '../api/presentationApi';
import {
  REQUEST_PRESENTATION,
  RECEIVE_PRESENTATION,
  FETCH_PRESENTATION,
  FETCH_PRESENTATION_ERROR,
  FETCH_PRESENTATION_CANCEL,
  REQUEST_PRESENTATION_LIST,
  RECEIVE_PRESENTATION_LIST,
  FETCH_PRESENTATION_LIST,
  FETCH_PRESENTATION_LIST_ERROR,
  FETCH_PRESENTATION_LIST_CANCEL,

} from '../actions/presentationActions';
import { call, put, cancelled } from 'redux-saga/effects';


export function* watchFetchPresentation() {
  console.log("je ne sais pas");
  yield takeEvery(REQUEST_PRESENTATION, fetchPresentation);
  console.log("je devrais arriver ici");
}

export function* watchFetchPresentationList() {
  console.log("je ne sais pas");
  yield takeEvery(REQUEST_PRESENTATION_LIST, fetchPresentationList);
  console.log("je devrais arriver ici");
}


export function* fetchPresentation(action) {
  try {
    yield put({ type: FETCH_PRESENTATION});
    const presentation = yield call(presentationApi.apiFetchPresentation, action.name);
    console.log(presentation);
    yield put({ type: RECEIVE_PRESENTATION, presentation });
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_PRESENTATION_ERROR, error});
  }
  finally {
    if (yield cancelled())
      yield put({ type: FETCH_PRESENTATION_CANCEL});
  }
}

export function* fetchPresentationList() {
  try {
    yield put({ type: FETCH_PRESENTATION_LIST});
    const presentationList = yield call(presentationApi.apiFetchPresentationList);
    console.log(presentationList);
    yield put({ type: RECEIVE_PRESENTATION_LIST, presentationList });
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_PRESENTATION_LIST_ERROR, error});
  }
  finally {
    if (yield cancelled())
      yield put({ type: FETCH_PRESENTATION_LIST_CANCEL});
  }
}