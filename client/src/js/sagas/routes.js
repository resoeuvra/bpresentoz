import { call, fork, put, select } from 'redux-saga/effects';
import { fetchPresentationList, fetchPresentation} from './apiSagas';
import {
    REQUEST_PRESENTATION_LIST, REQUEST_PRESENTATION, SHOW_PAGE, SET_MODE, REQUEST_PAGE, MODES, MASTER_SLAVE,
    STOP_MASTER_WEBSOCKET, STOP_SLAVE_WEBSOCKET, START_MASTER_WEBSOCKET, START_SLAVE_WEBSOCKET, SET_SLAVE_MASTER
} from '../actions/presentationActions';
import { getPresentationName,
         getCurrentPage,
         getCurrentStep,
         getCurrentMode,
         getTotalPages} from './selectors';

export const routes = {
  '/': function* presentationListRouteSaga() {
    yield put({ type: REQUEST_PRESENTATION_LIST });
    const presentationList = yield call(fetchPresentationList);
  },

  '/:name.:mode?.:pres?/:page?/:step?': function* presentationRouteSaga({ name, mode = MODES.HTML, pres = "NO_CHANGES", page = '0', step = '0'}) {
    const currentName = yield select(getPresentationName);
    const currentPage = yield select(getCurrentPage);
    const currentStep = yield select(getCurrentStep);
    const currentMode = yield select(getCurrentMode);
    const totalPages = yield select(getTotalPages);
    const pageNumber = parseInt(page, 10);
    const stepNumber = parseInt(step, 10);
    if (currentMode !== mode) {
      yield put({type: SET_MODE, mode: mode});
    }
    if (currentName !== name || currentName === null) {
      console.log("will load presentation " + name);
      yield put({type: REQUEST_PRESENTATION, name: name, page:pageNumber, step:stepNumber});
    } else {
        if (currentPage!== pageNumber || currentPage === null)  {
            yield put({type: REQUEST_PAGE, page: pageNumber, step: stepNumber});
        }
    }

    if (currentStep !== step || currentStep === null) {
      // presentation = yield call(fetchPresentation, name);
      // call show step number
    }  else {
      // do nothing
    }
    console.log(pres);

    switch(pres) {
        case MASTER_SLAVE.SL:
            yield put({type: SET_SLAVE_MASTER, masterSlave: MASTER_SLAVE.SL});
            yield put({type: START_SLAVE_WEBSOCKET});
            break;
        case MASTER_SLAVE.MS:
            yield put({type: SET_SLAVE_MASTER, masterSlave: MASTER_SLAVE.MS});
            yield put({type: START_MASTER_WEBSOCKET});
            break;
        case MASTER_SLAVE.NONE:
            yield put({type: SET_SLAVE_MASTER, masterSlave: MASTER_SLAVE.NONE});
            yield put({type: STOP_MASTER_WEBSOCKET});
            yield put({type: STOP_SLAVE_WEBSOCKET});
            break;
        default:
            console.log("no changes");
    }

  },
};