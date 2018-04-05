import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from '../reducers/reducers'
import { sagaMiddleware, rootSaga } from '../sagas/root';



const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        sagaMiddleware
    ));


sagaMiddleware.run(rootSaga);

export default store;