import { TOGGLE_RECORD } from "../constants/action-types";

const initialState = {
	toggleRecord: true,
	toggleText: "Playback"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_RECORD:
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