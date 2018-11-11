import { TOGGLE_SELECT_MULTIPLE } from "../constants/action-types";

const initialState = {
	selectMultiple: true,
	selectedUnits: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_SELECT_MULTIPLE:
			return {
				...state,
				selectMultiple: !state.selectMultiple
			}

		default:
			return state;
	}
};
export default reducer;