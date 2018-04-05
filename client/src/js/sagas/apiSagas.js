import { takeEvery, call, put, take, race, cancelled, select  } from 'redux-saga/effects';
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
    REQUEST_PAGE,
    START_MASTER_WEBSOCKET,
    START_SLAVE_WEBSOCKET,
    STOP_MASTER_WEBSOCKET,
    STOP_SLAVE_WEBSOCKET, SHOW_PAGE, MASTER_SLAVE
} from '../actions/presentationActions';
import {eventChannel, END } from 'redux-saga';
import { getPresentationName,
    getCurrentPage,
    getCurrentStep,
    getCurrentMode,
    getTotalPages} from './selectors';

const WEBSOCKET_PATH = "/broadcast";

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
      totalPages: presentation.pages.length,
      name: presentation.name,
      title: presentation.title,
    });
    yield put({ type: REQUEST_PAGE, page: parseInt(action.page, 10)})
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

// see example at https://medium.com/@ebakhtarov/bidirectional-websockets-with-redux-saga-bfd5b677c7e7

function createWsUrl(masterSlave) {
  const isSSL = (document.location.protocol.indexOf('s') >= 0);
  const hasPort = (document.location.port.length > 0);
  return "ws" + (isSSL ? 's' : '') + "://" + location.hostname + (hasPort ? ":" + location.port : "") + WEBSOCKET_PATH;
}

function watchMasterMessage(socket) {
  return eventChannel((emitter) => {
    socket.onopen = () => {
      console.log("Socket connection open for master");
      emitter("SOCKET_OPENED");
    };
    socket.onmessage = (event) => {
      console.log("Master message" + event.data);
    };
    return () => {
      socket.close();
    }
  })
}

function watchSlaveMessage(socket) {
    return eventChannel((emitter) => {
        socket.onopen = () => {
            console.log("Socket connection open for slave");
        };
        socket.onmessage = (event) => {
            console.log("Slave message 2");
            console.log(event.data);
            emitter(JSON.parse(event.data));
        };
        return () => {
            socket.close();
        }
    })
}

function* masterPageChangeListener(socket) {
  while (true) {
    console.log("settin up masterpage listener");
    const pageData = yield take(SHOW_PAGE);
    console.log("sending page to websocket 5");
    console.log(pageData);
    console.log("sending page to websocket 6");
    socket.send(JSON.stringify({currentPage:pageData.page}));
    console.log("sending page to websocket 7");
  }
}

function* slavePageChangeListener(channel) {
    while (true) {
        const pageData = yield take(channel);
        yield put({type: REQUEST_PAGE, page: pageData.currentPage, step: 0});
    }
}

export function* wsMasterHandler() {
  while(true) {
    const data = yield take(START_MASTER_WEBSOCKET);
    yield put({type: STOP_SLAVE_WEBSOCKET});
    const socket = new WebSocket(createWsUrl(MASTER_SLAVE.MS));
    console.log("creating socket");
    const currentPage = yield select(getCurrentPage);
    console.log("current page is ");
    console.log(currentPage);

    const socketChannel = yield call(watchMasterMessage, socket);
    console.log("waiting for socket to open");

    const work = yield take(socketChannel);
    console.log(work);
    console.log("socket should be opened");
    const {cancel} = yield race ( {
        sendPage: call(masterPageChangeListener, socket),
        cancel: take(STOP_MASTER_WEBSOCKET)
    });
    if (cancel) {
      socketChannel.close();
    }
  }
}

export function* wsSlaveHandler() {
    while(true) {
        const data = yield take(START_SLAVE_WEBSOCKET);
        yield put({type: STOP_MASTER_WEBSOCKET});
        const socket = new WebSocket(createWsUrl(MASTER_SLAVE.SL));
        const socketChannel = yield call(watchSlaveMessage, socket);
        const {cancel} = yield race ( {
            receivePage: call(slavePageChangeListener, socketChannel),
            cancel: take(STOP_SLAVE_WEBSOCKET)
        });
        if (cancel) {
            socketChannel.close();
        }
    }
}

