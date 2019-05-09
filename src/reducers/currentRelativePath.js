import { ENTER_FOLDER } from "../constants/action-types";

const reducer = (state = "/home", action) => {
	console.log(state);
	switch (action.type) {
		case ENTER_FOLDER:
			return `${state}/${action.payload.folderName}`

		default:
			return state;
	}
};

export default reducer;