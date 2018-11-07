import ENTER_FOLDER from "../constants/action-types";

const reducer = (state = 22, action) => {
	switch (action.type) {
		case ENTER_FOLDER:
		console.log("ID of the folder clicked on:", action.payload.currentFolder)
			return {
				...state,
				currentFolder
			};
		default:
			return state;
	}
};
export default reducer;