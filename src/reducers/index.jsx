import { combineReducers } from 'redux';
import songsReducer from './reducer-songs';

const allReducers = combineReducers({
  songs: songsReducer
});
export default allReducers;
