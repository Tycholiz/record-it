import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	RECORD,
	PLAYBACK,
	TOGGLE_OPTIONS,
} from "../constants/action-types";

const initialState = {
	controlView: 'record',
	toggleText: PLAYBACK,
	recording: false,
	optionsOpen: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CONTROL_VIEW:
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
		case TOGGLE_OPTIONS:
			return {
				...state,
				optionsOpen: !state.optionsOpen
			};
		default:
			return state;
	}
};
export default reducer;