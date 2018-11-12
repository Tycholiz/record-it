import {
	TOGGLE_SELECT_MULTIPLE,
	CONFIRM_MULTIPLE_SELECTION
 } from "../constants/action-types";

const initialState = {
	selectMultiple: false,
	selectedUnits: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_SELECT_MULTIPLE:
			return {
				...state,
				selectMultiple: !state.selectMultiple
			}
		case CONFIRM_MULTIPLE_SELECTION:
			return {
				...state,
				selectedUnits: action.payload.selectedUnits
			}

		default:
			return state;
	}
};
export default reducer;