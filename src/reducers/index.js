import { TOGGLE_RECORD } from "../constants/action-types";

const initialState = {
	toggleRecord: true,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_RECORD:
			return {
				...state,
				toggleRecord: !state.toggleRecord
			};
		default:
			return state;
	}
};
export default reducer;