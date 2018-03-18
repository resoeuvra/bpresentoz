import { call, fork, put, select } from 'redux-saga/effects';
import { fetchPresentationList, fetchPresentation} from './apiSagas';
import {REQUEST_PRESENTATION_LIST, REQUEST_PRESENTATION, SHOW_PAGE} from '../actions/presentationActions';
import { getPresentationName,
         getCurrentPage,
         getCurrentStep} from './selectors';

export const routes = {
  '/': function* presentationListRouteSaga() {
    yield put({ type: REQUEST_PRESENTATION_LIST });
    const presentationList = yield call(fetchPresentationList);
  },

  '/:name/:page?/:step?': function* presentationRouteSaga({ name, page = '0', step = '0'}) {
    const currentName = yield select(getPresentationName);
    const currentPage = yield select(getCurrentPage);
    const currentStep = yield select(getCurrentStep);
    const pageNumber = parseInt(page, 10);
    const stepNumber = parseInt(step, 10);
    if (currentName !== name || currentName === null) {
      console.log("will load presentation " + name);
      yield put({type: REQUEST_PRESENTATION, name: name, page:pageNumber, step:stepNumber});
    }
    console.log("page: " + page);
    if (currentPage!== pageNumber || currentPage === null) {
      yield put({type: SHOW_PAGE, page: pageNumber, step: stepNumber});
    }
    if (currentStep !== step || currentStep === null) {
      // presentation = yield call(fetchPresentation, name);
      // call show step number
    }  else {
      // do nothing
    }
  },
};