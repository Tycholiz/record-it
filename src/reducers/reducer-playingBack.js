import { PLAYING_BACK } from "../constants/action-types";

const initialState = {
	toggleRecord: true,
	toggleText: "Playback"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case PLAYING_BACK:
			return {
				...state,

			};
		default:
			return state;
	}
};
export default reducer;