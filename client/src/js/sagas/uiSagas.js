import { call, put } from 'redux-saga/effects';
import { REQUEST_PRESENTATION, RECEIVE_PRESENTATION } from '../actions/presentationActions';

export function* helloSaga() {
  yield put({ type: REQUEST_PRESENTATION });
}