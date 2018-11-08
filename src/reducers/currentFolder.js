import { ENTER_FOLDER } from "../constants/action-types";

const reducer = (state = 22, action) => {
	switch (action.type) {
		case ENTER_FOLDER:
			return action.payload.currentFolder

		default:
			return state;
	}
};
export default reducer;