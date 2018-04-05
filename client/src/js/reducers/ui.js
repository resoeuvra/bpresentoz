import {
  // UI actions
  START_PRESENTATION,
  END_PRESENTATION,
  SHOW_TABLE_OF_CONTENTS,
  HIDE_TABLE_OF_CONTENTS,
  SHOW_TOOLS,
  HIDE_TOOLS,
  SHOW_PAGE,
  REQUEST_STEP,
  SET_MODE,
  MODES,
} from '../actions/presentationActions';



const initialState = {
  name: null,
  title: null,
  pageShown: null,
  totalPages: null,
  stepShown: null,
  tableOfContentShown: false,
  toolsShown:false,
  active:false,
  mode: MODES.HTML,

};

function presentationAppUI(state = initialState, action) {
  switch (action.type) {
    case START_PRESENTATION:
      return Object.assign({}, state, {
        totalPages: action.totalPages,
        toolsShown:true,
        pageShown:0,
        title: action.title,
        name: action.name,
      });
    case END_PRESENTATION:
      return Object.assign({}, state, {
        active: false,
        pageShown: null,
        tableOfContentShown: false,
        toolsShown:false,
        totalPages: null,
        stepShown: null,
        title: null,
        name:null,
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
        showTools: true
      });
    case HIDE_TOOLS:
      return Object.assign({}, state, {
        showTools: false
      });
    case SHOW_PAGE:
      return Object.assign({}, state, {
        active: true,
        pageShown: action.page,
        stepShown: 0,
      });
    case REQUEST_STEP:
      return Object.assign({}, state, {
        stepShown: action.step,
      });
      case SET_MODE:
        return Object.assign({}, state, {
        mode:action.mode
      });

    default:
      return Object.assign({}, state);
  }
}

export default presentationAppUI;
