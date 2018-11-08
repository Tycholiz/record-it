import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	RECORD,
	PLAYBACK
} from "../constants/action-types";

const initialState = {
	controlView: 'record',
	toggleText: PLAYBACK,
	recording: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CONTROL_VIEW:
		console.log(action.type)
			return {
				...state,
				controlView: state.controlView === 'record' ? 'playback' : 'record',
				toggleText: state.toggleText === PLAYBACK ? RECORD : PLAYBACK,
			};
		case START_RECORDING:
			return {
				...state,
				recording: !state.recording
			};
		case START_PLAYING:
			return {
				...state,
				playing: !state.playing
			};
		default:
			return state;
	}
};
export default reducer;