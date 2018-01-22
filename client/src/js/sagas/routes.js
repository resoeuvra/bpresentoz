import { call, fork, put, select } from 'redux-saga/effects';
import { fetchPresentationList, fetchPresentation} from './apiSagas';
import {REQUEST_PRESENTATION_LIST, REQUEST_PRESENTATION} from '../actions/presentationActions';
import { getPresentationName,
         getCurrentPage,
         getCurrentStep} from './selectors';

export const routes = {
  '/': function* presentationListRouteSaga() {
    yield put({ type: REQUEST_PRESENTATION_LIST });
    const presentationList = yield call(fetchPresentationList);
  },

  '/:name/:page?/:step?': function* presentationRouteSaga({ name, page, step }) {
    const currentName = yield select(getPresentationName);
    const currentPage = yield select(getCurrentPage);
    const currentStep = yield select(getCurrentStep);
    if (currentName !== name || currentName === null) {
      console.log("will load presentation " + name);
      yield put({type: REQUEST_PRESENTATION, name})
     // presentation = yield call(fetchPresentation, name);
    }
    if (currentPage!== page || currentPage === null) {
      // presentation = yield call(fetchPresentation, name);
      // call show page number
    }  else {
      // call show page 1
    }
    if (currentStep !== step || currentStep === null) {
      // presentation = yield call(fetchPresentation, name);
      // call show step number
    }  else {
      // do nothing
    }
  },
};