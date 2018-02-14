import {
  // data fetch & API actions
  REQUEST_PRESENTATION,
  FETCH_PRESENTATION,
  RECEIVE_PRESENTATION,
  FETCH_PRESENTATION_ERROR,
  FETCH_PRESENTATION_CANCEL,
  REQUEST_PRESENTATION_LIST,
  FETCH_PRESENTATION_LIST,
  RECEIVE_PRESENTATION_LIST,
  FETCH_PRESENTATION_LIST_ERROR,
  FETCH_PRESENTATION_LIST_CANCEL,
} from '../actions/presentationActions';

const initialState = {
  presentationPath: null,
  presentationData: null,
  presentationList:null,
  isFetchingPresentation: false,
  isFetchingPresentationList: false,
  error: null,
};

function presentationAppData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRESENTATION:
      return Object.assign({}, state, {
        presentationPath: action.presentationPath,
      });
    case FETCH_PRESENTATION:
      return Object.assign({}, state, {
        isFetchingPresentation: true,
      });
    case RECEIVE_PRESENTATION:
      return Object.assign({}, state, {
        isFetchingPresentation: false,
        presentationData: action.presentation,
      });
    case FETCH_PRESENTATION_ERROR:
      return Object.assign({}, state, {
        isFetchingPresentation: false,
        presentationData: null,
        presentationPath: null,
        error: state.error,
      });
    case REQUEST_PRESENTATION_LIST:
      return Object.assign({}, state, {
        isFetchingPresentation: false,
        isFetchingPresentationList: false,
      });
    case FETCH_PRESENTATION_LIST:
      return Object.assign({}, state, {
        isFetchingPresentationList: true,
      });
    case RECEIVE_PRESENTATION_LIST:
      return Object.assign({}, state, {
        isFetchingPresentationList: false,
        presentationList: action.presentationList,
        presentationData: null,
        presentationPath: null,
      });
    case FETCH_PRESENTATION_LIST_ERROR:
      return Object.assign({}, state, {
        isFetchingPresentationList: false
      });
    default:
      return Object.assign({}, state);
  }
}

export default presentationAppData;
