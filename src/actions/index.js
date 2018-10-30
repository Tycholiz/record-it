import { TOGGLE_RECORD_PLAYBACK } from "../constants/action-types";

export const toggleRecordPlayback = toggleRecord => ({
	type: TOGGLE_RECORD_PLAYBACK,
	payload: {
		toggleRecord: !toggleRecord,
		toggleText: toggleRecord ? "Record" : "Playback",
	},
});