import { ENTER_FOLDER } from "../constants/action-types";

const reducer = (state = "/home", action) => {
	console.log(state);
	switch (action.type) {
		case ENTER_FOLDER:
			return `${action.payload.newPath}`

		default:
			return state;
	}
};

export default reducer;