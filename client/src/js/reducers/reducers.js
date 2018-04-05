import { combineReducers } from 'redux';
import presentationAppUI from './ui';
import presentationAppData from './data';

const reducers = combineReducers({
  data:presentationAppData,
  ui:presentationAppUI
});

export default reducers;