/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import demoReducer from './demo';

const rootReducer = combineReducers({
  demoReducer,
});

export default rootReducer;
