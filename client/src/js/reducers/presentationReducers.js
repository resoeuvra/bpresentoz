import {
    // data fetch & API actions
    REQUEST_PRESENTATION,
    FETCH_PRESENTATION,
    RECEIVE_PRESENTATION,
    FETCH_PRESENTATION_ERROR,

    // UI actions
    NEXT_PAGE,       // trapped by saga
    PREVIOUS_PAGE,   // trapped by saga
    START_PRESENTATION,
    END_PRESENTATION,
    SHOW_TABLE_OF_CONTENTS,
    HIDE_TABLE_OF_CONTENTS,
    SHOW_TOOLS,
    HIDE_TOOLS,
    SHOW_PAGE,
    REQUEST_STEP,
    NEXT_STEP,  // managed by saga
    PREVIOUS_STEP // managed by saga
} from '../actions/presentationActions';

const initialState = {
    presentationPath : null,
    presentationData : null,
    presentationCurrentPage : null,
    presentationCurrentStep : null,
    tableOfContentShown: false,
    toolsShown: false,
    isFetchingPresentation: false,
    presentationActive:false,
    error: null
};

function presentationApp(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PRESENTATION:
            return Object.assign({}, state, {
                presentationPath: action.presentationPath
            });
        case FETCH_PRESENTATION:
            return Object.assign({}, state, {
                isFetchingPresentation:true
            });
        case RECEIVE_PRESENTATION:
            return Object.assign({}, state, {
                isFetchingPresentation:false,
                presentationData: action.presentationData
            });
        case FETCH_PRESENTATION_ERROR:
            return Object.assign({}, state, {
                isFetchingPresentation:false,
                presentationData: null,
                presentationPath : null,
                presentationCurrentPage : null,
                presentationCurrentStep : null,
                error: state.error
            });
        case START_PRESENTATION:
            return Object.assign({}, state, {
                presentationActive: true
            });
        case END_PRESENTATION:
            return Object.assign({}, state, {
                presentationActive: false
            });
        case SHOW_TABLE_OF_CONTENTS:
            return Object.assign({}, state, {
                tableOfContentShown: true
            });
        case HIDE_TABLE_OF_CONTENTS:
            return Object.assign({}, state, {
                tableOfContentShown: false
            });
        case SHOW_TOOLS:
            return Object.assign({}, state, {
                toolsShown: true
            });
        case HIDE_TOOLS:
            return Object.assign({}, state, {
                toolsShown: false
            });
        case SHOW_PAGE:
            return Object.assign({}, state, {
                presentationCurrentPage: action.requestedPage,
                presentationCurrentStep: 0
            });
        case REQUEST_STEP:
            return Object.assign({}, state, {
                presentationCurrentStep: action.requestedStep
            });
    }
}

export default presentationApp;