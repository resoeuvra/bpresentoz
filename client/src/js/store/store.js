import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers/presentationReducers'
import { helloSaga } from '../sagas/uiSagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        sagaMiddleware
    ));

sagaMiddleware.run(helloSaga);

export default store;