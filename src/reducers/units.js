import { READ_DIRECTORY } from "../constants/action-types";

const reducer = (state = [], action) => {
	switch (action.type) {
		case READ_DIRECTORY:
			return action.payload.units

		default:
			return state;
	}
};

export default reducer;