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
  START_PRESENTATION,
  END_PRESENTATION,

} from '../actions/presentationActions';
import { call, put, cancelled } from 'redux-saga/effects';


export function* watchFetchPresentation() {
  yield takeEvery(REQUEST_PRESENTATION, fetchPresentation);
}

export function* watchFetchPresentationList() {
  yield takeEvery(REQUEST_PRESENTATION_LIST, fetchPresentationList);
}


export function* fetchPresentation(action) {
  try {
    yield put({ type: FETCH_PRESENTATION});
    const presentation = yield call(presentationApi.apiFetchPresentation, action.name);
    yield put({ type: RECEIVE_PRESENTATION, presentation: presentation});
    yield put({ type: START_PRESENTATION,
      page: parseInt(action.page, 10),
      step: action.step,
      totalPages: presentation.pages.length,
      name: presentation.name,
      title: presentation.title,
    });

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
    yield put({ type: END_PRESENTATION});
    yield put({ type: FETCH_PRESENTATION_LIST});
    const presentationList = yield call(presentationApi.apiFetchPresentationList);
    yield put({ type: RECEIVE_PRESENTATION_LIST, presentationList });
  } catch (error) {
    yield put({ type: FETCH_PRESENTATION_LIST_ERROR, error});
  }
  finally {
    if (yield cancelled())
      yield put({ type: FETCH_PRESENTATION_LIST_CANCEL});
  }
}