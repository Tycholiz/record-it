import { TOGGLE_RECORD_PLAYBACK } from "../constants/action-types";

const initialState = {
	toggleRecord: false,
	toggleText: "Playback"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_RECORD_PLAYBACK:
			return {
				...state,
				toggleRecord: !state.toggleRecord,
				toggleText: state.toggleText === "Playback" ? "Record" : "Playback",
			};
		default:
			return state;
	}
};
export default reducer;