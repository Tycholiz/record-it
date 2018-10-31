import { START_PLAYING } from "../constants/action-types";

const initialState = {
	playing: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
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