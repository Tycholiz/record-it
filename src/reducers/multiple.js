import { TOGGLE_SELECT_MULTIPLE } from "../constants/action-types";

const initialState = {
	selectMultiple: false,
	selectedUnits: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_SELECT_MULTIPLE:
			return {
				...state
			}

		default:
			return state;
	}
};
export default reducer;