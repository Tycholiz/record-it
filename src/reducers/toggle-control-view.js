import { TOGGLE_CONTROL_VIEW, RECORD, PLAYBACK } from "../constants/action-types";

const initialState = {
	controlView: 'record',
	toggleText: PLAYBACK,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CONTROL_VIEW:
			return {
				...state,
				controlView: state.controlView === 'record' ? 'playback' : 'record',
				toggleText: state.toggleText === PLAYBACK ? RECORD : PLAYBACK,
			};
		default:
			return state;
	}
};
export default reducer;