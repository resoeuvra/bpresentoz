import {call, fork, put, select, takeEvery} from 'redux-saga/effects';
import {REQUEST_PAGE, REQUEST_PRESENTATION, SHOW_PAGE} from '../actions/presentationActions';
import {getCurrentPage, getTotalPages } from './selectors';
import {fetchPresentation} from "./apiSagas";

export function* watchRequestPage() {
    yield takeEvery(REQUEST_PAGE, requestPage);
}

export function* requestPage(action) {
  const totalPages = yield select(getTotalPages);
  const currentPage = yield select(getCurrentPage);
  if (totalPages > action.page) {
      yield put({ type: SHOW_PAGE, page:action.page});
  } else {
      yield put({ type: SHOW_PAGE, page:currentPage});
  }
}

