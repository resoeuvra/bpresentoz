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
  // UI actions
  START_PRESENTATION,
  END_PRESENTATION,
  SHOW_TABLE_OF_CONTENTS,
  HIDE_TABLE_OF_CONTENTS,
  SHOW_TOOLS,
  HIDE_TOOLS,
  SHOW_PAGE,
  REQUEST_STEP,
} from '../actions/presentationActions';

const initialState = {
  presentationPath: null,
  presentationData: null,
  currentPresentationName: null,
  presentationCurrentPage: null,
  presentationCurrentStep: null,
  presentationList:null,
  tableOfContentShown: false,
  toolsShown: false,
  isFetchingPresentation: false,
  isFetchingPresentationList: false,
  presentationActive: false,
  error: null,
};

function presentationApp(state = initialState, action) {
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
      console.log("allo");
      console.log(action);
      return Object.assign({}, state, {
        isFetchingPresentation: false,
        presentationData: action.presentation,
        currentPresentationName: action.presentation.name,
        presentationCurrentPage:0,
      });
    case FETCH_PRESENTATION_ERROR:
      return Object.assign({}, state, {
        isFetchingPresentation: false,
        presentationData: null,
        presentationPath: null,
        presentationCurrentPage: null,
        presentationCurrentStep: null,
        currentPresentationName: null,
        error: state.error,
      });
    case REQUEST_PRESENTATION_LIST:
      return Object.assign({}, state, {
        isFetchingPresentation: false,
        isFetchingPresentationList: false,
        presentationData: null,
        presentationPath: null,
        presentationCurrentPage: null,
        presentationCurrentStep: null,
        currentPresentationName: null,
      });
    case FETCH_PRESENTATION_LIST:
      return Object.assign({}, state, {
        isFetchingPresentationList: true,
      });
    case RECEIVE_PRESENTATION_LIST:
      return Object.assign({}, state, {
        isFetchingPresentationList: false,
        presentationList: action.presentationList,
      });
    case FETCH_PRESENTATION_LIST_ERROR:
      return Object.assign({}, state, {
        isFetchingPresentationList: false
      });

    case START_PRESENTATION:
      return Object.assign({}, state, {
        presentationActive: true,
      });
    case END_PRESENTATION:
      return Object.assign({}, state, {
        presentationActive: false,
      });
    case SHOW_TABLE_OF_CONTENTS:
      return Object.assign({}, state, {
        tableOfContentShown: true,
      });
    case HIDE_TABLE_OF_CONTENTS:
      return Object.assign({}, state, {
        tableOfContentShown: false,
      });
    case SHOW_TOOLS:
      return Object.assign({}, state, {
        toolsShown: true,
      });
    case HIDE_TOOLS:
      return Object.assign({}, state, {
        toolsShown: false,
      });
    case SHOW_PAGE:
      return Object.assign({}, state, {
        presentationCurrentPage: action.requestedPage,
        presentationCurrentStep: 0,
      });
    case REQUEST_STEP:
      return Object.assign({}, state, {
        presentationCurrentStep: action.requestedStep,
      });
    default:
      return Object.assign({}, state);
  }
}

export default presentationApp;
