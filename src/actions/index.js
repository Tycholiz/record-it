import { TOGGLE_RECORD } from "../constants/action-types";

export const toggleRecordPlayback = toggleRecord => ({
	type: TOGGLE_RECORD,
	payload: {
		toggleRecord: !toggleRecord
	},
});