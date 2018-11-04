import { TOGGLE_CONTROL_VIEW } from "../constants/action-types";

const initialState = {
	controlView: 'record',
	toggleText: "Playback"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CONTROL_VIEW:
			return {
				...state,
				controlView: state.controlView === 'record' ? 'playback' : 'record',
				toggleText: state.toggleText === "Playback" ? "Record" : "Playback",
			};
		default:
			return state;
	}
};
export default reducer;