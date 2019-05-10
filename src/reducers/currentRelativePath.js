import { ENTER_FOLDER } from "../constants/action-types";

const reducer = (state = "/home", action) => {
	switch (action.type) {
		case ENTER_FOLDER:
			return `${action.payload.newPath}`

		default:
			return state;
	}
};

export default reducer;