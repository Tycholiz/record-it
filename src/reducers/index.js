import { combineReducers } from 'redux';
import toggle from './reducer-toggle';
import recording from './reducer-recording';
import playingBack from './reducer-playingBack';

export default combineReducers({
	toggle,
	recording,
	// playingBack,
});