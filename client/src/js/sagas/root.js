import createSagaMiddleware from 'redux-saga';
import { watchFetchPresentation } from './apiSagas';
import { put, fork } from 'redux-saga/effects';
import {routes} from './routes';
import { router, createHashHistory } from 'redux-saga-router';
import {INIT} from '../actions/presentationActions';

export const sagaMiddleware = createSagaMiddleware();

const history = createHashHistory();

export function* rootSaga() {
  yield put({ type: INIT});
  yield fork (watchFetchPresentation);
  yield fork(router, history, routes);
}
