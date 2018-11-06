import ENTER_FOLDER from "../constants/action-types";

const reducer = (state = 1, action) => {
	switch (action.type) {
		case ENTER_FOLDER:
			return {
				...state,
				currentFolder
			};
		default:
			return state;
	}
};
export default reducer;