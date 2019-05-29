import { READ_DIRECTORY, ADD_AUDIO_FILE } from "../constants/action-types";

import RNFS from 'react-native-fs'

const reducer = (state = [], action) => {
	switch (action.type) {
		case READ_DIRECTORY:
			return action.payload.units

		default:
			return state;
	}
};

export default reducer;