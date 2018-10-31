import { combineReducers } from 'redux';
import toggle from './reducer-toggle';
import recording from './reducer-recording';
import playing from './reducer-playing';

export default combineReducers({
	toggle,
	recording,
	playing,
});