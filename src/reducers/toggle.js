import {
	TOGGLE_CONTROL_VIEW,
} from "../constants/action-types";

import { ControlView } from '../constants/enumerables';

const initialState = {
	controlView: ControlView.Playback,
	recording: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CONTROL_VIEW:
			return {
				...state,
				controlView: state.controlView === ControlView.Record ? ControlView.Playback : ControlView.Record,
			};
		default:
			return state;
	}
};
export default reducer;