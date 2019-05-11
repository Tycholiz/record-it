import { SET_ACTIVE_FILE } from "../constants/action-types";

const reducer = (state = null, action) => {
	switch (action.type) {
		case SET_ACTIVE_FILE:
			return action.payload.fullAudioPath
		default:
			return state;
	}
};
export default reducer;